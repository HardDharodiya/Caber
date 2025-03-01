import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

const LocationSearchPanel = (props) => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const cleanToken = token ? token.replace(/"/g, "") : ""; // Handle possible null token
    const url = `http://localhost:3000/api/route/bulk?origin=${props.pickup}&destination=${props.destination}`;

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
            className="flex border-4 border-gray-100 active:border-[#9A6AFF] items-center justify-start bg-gray-100 rounded-2xl p-2 gap-3"
          >
            <h2 className="bg-gray-300 h-10 w-16 flex justify-center items-center rounded-full">
              <i className="ri-map-pin-2-line"></i>
            </h2>
            <h4 className="font-medium">{`${
              route.origin.charAt(0).toUpperCase() + route.origin.slice(1)
            } to ${
              route.destination.charAt(0).toUpperCase() +
              route.destination.slice(1)
            }`}</h4>
          </div>
        ))
      )}
    </div>
  );
};

export default LocationSearchPanel;
