import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getUserData from "../utils/getUserData";

const CaptainAboutPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserData();
      if (user) {
        setUserData(user);
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
        {userData ? (
          <div className="flex flex-col gap-4 mt-4 px-4">
            {/* Name */}
            <div>
              <h2>Name</h2>
              <div className="w-full h-0.5 bg-slate-400 mt-2 mb-4 rounded-full"></div>

              <div className="flex justify-between bg-white w-full rounded-xl px-2 items-center">
                <div className="flex flex-col gap-1 text-black rounded-xl pl-3 py-2">
                  <div className="text-sm text-gray-500">First Name</div>
                  <div className="text-xl font-semibold">
                    {userData.user.firstName || "N/A"}
                  </div>
                </div>
                <div className="bg-gray-200 h-14 rounded-full w-0.5"></div>
                <div className="flex flex-col gap-1 text-black rounded-xl pr-3 py-2">
                  <div className="text-sm text-gray-500">Last Name</div>
                  <div className="text-xl font-semibold">
                    {userData.user.lastName || "N/A"}
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
                  {userData.user.email || "N/A"}
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div>
              <h2 className="text-sm">
                Vehicle Information:{" "}
                <span className="text-lg font-mono">
                  {userData.user.vehicle?.model || "N/A"}
                </span>
              </h2>
              <div className="w-full h-0.5 bg-slate-400 mt-2 mb-4 rounded-full"></div>

              <div className="grid grid-cols-2 gap-2 bg-white w-full rounded-xl px-2 py-2 text-black">
                <div>
                  <div className="text-sm text-gray-500">Vehicle Colour</div>
                  <div className="text-xl font-semibold">
                    {userData.user.vehicle?.color || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Vehicle Plate</div>
                  <div className="text-xl font-semibold">
                    {userData.user.vehicle?.plate || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Vehicle Capacity</div>
                  <div className="text-xl font-semibold flex items-center gap-2">
                    <div>{userData.user.vehicle?.capacity || "N/A"}</div>
                    <i className="ri-user-3-line text-lg font-thin"></i>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Vehicle Type</div>
                  <div className="text-xl font-semibold">
                    {userData.user.vehicle?.type || "N/A"}
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
                  {userData.user.licenseNumber || "xxxx xxxx xxxx"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center mt-4">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CaptainAboutPage;
