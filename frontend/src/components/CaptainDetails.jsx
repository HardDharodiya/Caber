import React, { useContext } from "react";
import User from "../assets/dummy-user.jpg";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";

const CaptainDetails = () => {
  const { captainData } = useContext(CaptainDataContext);
  console.log("captainData", captainData);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-between gap-2">
      <div className="flex justify-between items-center ">
        <div className="flex justify-between items-center gap-3">
          <img
            src={User}
            alt="Captain"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h4 className="text-lg font-medium text-white">
            {captainData?.user?.firstName.charAt(0).toUpperCase() +
              captainData?.user?.firstName.slice(1) +
              " " +
              captainData?.user?.lastName || "N/A"}
          </h4>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-green-500">
            {"₹" + captainData?.user?.balance || "N/A"}
          </h4>
          <p className="text-sm text-gray-200">Earned</p>
        </div>
      </div>

      <div className="flex justify-center w-full p-4 rounded-2xl mt-1">
        <button
          className="my-1 mx-3  flex items-center justify-center w-full bg-[#9A6AFF] text-[#ffffff] py-3 rounded-xl text-xl font-semibold"
          onClick={() => {
            navigate("/create-ride");
          }}
        >
          Create Ride
        </button>
        <button
          className="my-1 mx-3 flex items-center justify-center w-full bg-[#9A6AFF] text-[#ffffff] py-3 rounded-xl text-xl font-semibold"
          onClick={() => {
            navigate("/my-rides");
          }}
        >
          My Rides
        </button>
      </div>
    </div>
  );
};

export default CaptainDetails;
