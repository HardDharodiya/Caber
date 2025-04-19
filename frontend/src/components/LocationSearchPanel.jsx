import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

const LocationSearchPanel = (props) => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const cleanToken = token ? token.replace(/"/g, "") : ""; // Handle possible null token
    const url = `https://caber-77w9.onrender.com/api/route/bulk?origin=${props.pickup}&destination=${props.destination}`;

    console.log(url);
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${cleanToken}` },
      })
      .then((res) => {
        console.log("res:", res.data.routes);
        setRoutes(res.data.routes || []); // Ensure routes is always an array
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props.pickup, props.destination]);

  return (
    <div className="flex flex-col gap-5 overflow-auto max-h-[85%] mb-2 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : routes.length === 0 ? (
        <p className="text-center text-gray-500">No routes found.</p>
      ) : (
        routes.map((route, index) => (
          <div
            key={index}
            onClick={() => {
              props.setRoute(route);
              props.setConfirmRidePanel(true);
              props.setPanelOpen(false);
            }}
            className="border-4 border-gray-100 active:border-[#9A6AFF] bg-gray-100 rounded-2xl p-2 gap-3"
          >
            <div className=" flex justify-center items-center">
              <h4 className="font-medium w-[70%]">{`${
                route.origin.charAt(0).toUpperCase() + route.origin.slice(1)
              } to ${
                route.destination.charAt(0).toUpperCase() +
                route.destination.slice(1)
              }`}</h4>
              <h4 className="font-semibold">₹ {route.cost || "N/A"}</h4>
            </div>
            <div className="flex justify-center items-center">
              <h4 className="font-medium w-[32%]">Date & Time: </h4>
              <h4 className="font-semibold">
                {new Date(route.dateTime).toUTCString().slice(0, 25)}
              </h4>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LocationSearchPanel;
