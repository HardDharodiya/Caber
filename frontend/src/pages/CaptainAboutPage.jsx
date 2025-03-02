import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVehicleData } from "../utils/getUserData";
import { CaptainDataContext } from "../context/CaptainContext";
import Spinner from "../components/Spinner";

const CaptainAboutPage = () => {
  const navigate = useNavigate();
  const { captainData } = useContext(CaptainDataContext);
  const [vehicle, setVehicle] = useState(null);

  console.log("captainData", captainData);
  useEffect(() => {
    const fetchData = async () => {
      const vehicle = await getVehicleData();
      if (vehicle) {
        setVehicle(vehicle);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen bg-[#1E2029] py-4 px-4 text-white">
      <div>
        {/* Back Button */}
        <div
          onClick={() => navigate("/about")}
          className="flex items-center gap-4 cursor-pointer"
        >
          <i className="ri-arrow-left-line text-white text-2xl"></i>
          <div className="font-normal text-xl">About</div>
        </div>

        {/* User Information */}
        {captainData ? (
          <div className="flex flex-col gap-4 mt-4 px-4">
            {/* Name */}
            <div>
              <h2>Name</h2>
              <div className="w-full h-0.5 bg-slate-400 mt-2 mb-4 rounded-full"></div>

              <div className="flex justify-between bg-white w-full rounded-xl px-2 items-center">
                <div className="flex flex-col gap-1 text-black rounded-xl pl-3 py-2">
                  <div className="text-sm text-gray-500">First Name</div>
                  <div className="text-xl font-semibold">
                    {captainData.user.firstName || "N/A"}
                  </div>
                </div>
                <div className="bg-gray-200 h-14 rounded-full w-0.5"></div>
                <div className="flex flex-col gap-1 text-black rounded-xl pr-3 py-2">
                  <div className="text-sm text-gray-500">Last Name</div>
                  <div className="text-xl font-semibold">
                    {captainData.user.lastName || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <h2>Email</h2>
              <div className="w-full h-0.5 bg-slate-400 mt-2 mb-4 rounded-full"></div>

              <div className="flex justify-between bg-white w-full rounded-xl px-2 items-center">
                <div className="text-lg font-mono text-black py-2">
                  {captainData.user.email || "N/A"}
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div>
              <h2 className="text-sm">
                Vehicle Information:{" "}
                <span className="text-lg font-mono">
                  {vehicle?.vehicles[0]?.vehicleModel || "N/A"}
                </span>
              </h2>
              <div className="w-full h-0.5 bg-slate-400 mt-2 mb-4 rounded-full"></div>

              <div className="grid grid-cols-2 gap-2 bg-white w-full rounded-xl px-2 py-2 text-black">
                <div>
                  <div className="text-sm text-gray-500">Vehicle Colour</div>
                  <div className="text-xl font-semibold">
                    {vehicle?.vehicles[0]?.vehicleColor || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Vehicle Plate</div>
                  <div className="text-xl font-semibold">
                    {vehicle?.vehicles[0]?.vehicleNumber || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Vehicle Capacity</div>
                  <div className="text-xl font-semibold flex items-center gap-2">
                    <div>{vehicle?.vehicles[0]?.vehicleCapacity || "N/A"}</div>
                    <i className="ri-user-3-line text-lg font-thin"></i>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Vehicle Type</div>
                  <div className="text-xl font-semibold">
                    {vehicle?.vehicles[0]?.vehicleType || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            {/* License Number */}
            <div>
              <h2>License No.</h2>
              <div className="w-full h-0.5 bg-slate-400 mt-2 mb-4 rounded-full"></div>

              <div className="flex justify-between bg-white w-full rounded-xl px-2 items-center">
                <div className="text-lg font-mono text-black py-2">
                  {captainData.user.licenseNumber || "xxxx xxxx xxxx"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[80vh]">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptainAboutPage;
