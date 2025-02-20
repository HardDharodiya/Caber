// this page opens when user is Rinig
import React, { useEffect, useState } from "react";
import map from "../assets/map.png";
import car from "../assets/Car.webp";
import User from "../assets/dummy-user.jpg";
import { Link, useNavigate } from "react-router-dom";
import { getUserData, getVehicleData } from "../utils/getUserData";

const Riding = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserData();
      if (user) {
        setUserData(user);
      }
    };
    const fetchVehicleData = async () => {
      const vehicle = await getVehicleData();
      console.log(vehicle);
      if (vehicle) {
        setVehicleData(vehicle);
      }
    };
    const fetchRouteData = async () => {};
    fetchUserData();
    fetchVehicleData();
    fetchRouteData();
  }, []);

  return (
    <div className="h-screen relative">
      <Link
        to="/home"
        className="fixed  h-10 w-10 bg-gray-900 flex items-center justify-center rounded-full right-4 top-4"
      >
        <i className="ri-home-5-line text-gray-200 text-lg font-medium"></i>
      </Link>

      {/* map */}
      <div className="h-screen w-screen">
        {/*map img for temporary use*/}
        <img src={map} alt="" className="h-[50%] w-full" />

        <div className="bg-gray-900 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={car} alt="" className="h-14 bg-white rounded-xl" />
              <img src={User} alt="" className="h-12 rounded-full" />
            </div>
            <div className="text-white text-right">
              <h2 className="text-lg font-medium -mt-1 -mb-1">
                {userData?.user?.firstName || "N/A"}
              </h2>
              <h4 className="text-xl font-semibold">
                {vehicleData?.vehicles?.vehicleNumber ?? "No Vehicle"}
              </h4>
              <p className="text-sm text-gray-200">Suzuki Alto LXI</p>
            </div>
          </div>

          <div className="flex gap-3 justify-between flex-col items-center my-1">
            <div className="w-full bg-[#fdfdfd] p-3 rounded-xl gap-3 my-2">
              <div className="flex items-center gap-5">
                <i className="ri-map-pin-2-fill text-lg"></i>
                <div>
                  <h3 className="text-lg font-medium">562/11-A</h3>
                  <p className="text-sm mt-1 text-gray-600">
                    Kankariya Talab, Ahmedabad
                  </p>
                </div>
              </div>

              <div className="border border-[#3d404f2c] w-full my-3"></div>

              <div className="flex items-center gap-5">
                <i className="ri-currency-line text-lg"></i>
                <div>
                  <h3 className="text-lg font-medium">₹193.20</h3>
                  <p className="text-sm mt-1 text-gray-600">Payment</p>
                </div>
              </div>
            </div>
          </div>

          <button
            className="w-full bg-[#9A6AFF] font-semibold p-3 rounded-xl my-1"
            onClick={() => {
              navigate("/payment");
            }}
          >
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
