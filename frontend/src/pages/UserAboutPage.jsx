import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../utils/getUserData";
import { UserDataContext } from "../context/UserContext";

const UserAboutPage = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);

  return (
    <div className="h-screen bg-[#1E2029] py-4 px-4 text-white">
      <div>
        <div
          onClick={() => navigate("/user-about")}
          className="flex items-center gap-4"
        >
          <i className="ri-arrow-left-line text-white text-2xl"></i>
          <div className="font-normal text-xl">About</div>
        </div>

        {userData ? (
          <div className="flex flex-col gap-2 mt-4 px-4">
            <div>
              <h2>Name</h2>
              <div className="w-full h-0.5 bg-slate-400 mt-2 mb-4 rounded-full"></div>

              <div className="flex justify-between bg-white w-full rounded-xl px-2 items-center">
                <div className="flex flex-col gap-1 text-black rounded-xl pl-3 py-2">
                  <div className="text-sm text-gray-500">First Name</div>
                  <div className="text-xl font-semibold">
                    {userData?.user?.firstName || "N/A"}
                  </div>
                </div>
                <div className="bg-gray-200 h-14 rounded-full w-0.5"></div>
                <div className="flex flex-col gap-1 text-black rounded-xl pr-3 py-2">
                  <div className="text-sm text-gray-500">Last Name</div>
                  <div className="text-xl font-semibold">
                    {userData?.user?.lastName || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2>Email</h2>
              <div className="w-full h-0.5 bg-slate-400 mt-2 mb-4 rounded-full"></div>

              <div className="flex justify-between bg-white w-full rounded-xl px-2 items-center">
                <div className="text-lg font-mono text-black py-2">
                  {userData?.user?.email || "N/A"}
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

export default UserAboutPage;
