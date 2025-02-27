import React, { useState } from "react";
import User from "../assets/dummy-user.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!otp) {
      alert("Please enter OTP before confirming the ride.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found!");
      alert("Authentication error. Please log in again.");
      return;
    }

    const cleanToken = token.replace(/"/g, ""); // Removing unwanted quotes
    console.log("cleanToken:", cleanToken);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/route/acceptRoute",
        {
          routeId: props.currentRide?._id, // Using optional chaining to prevent errors
          otp: otp, // Sending OTP
        },
        {
          headers: { Authorization: `Bearer ${cleanToken}` },
        }
      );

      console.log("Ride accepted successfully:", response.data);
      alert("Ride confirmed!");

      // You can close the popups after successful confirmation
      props.setConfirmRidePopUpPanel(false);
      props.setRidePopUpPanel(false);
    } catch (error) {
      console.error("Error confirming ride:", error);
      alert("Failed to confirm the ride. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full">
      <div
        className="opacity-1 mb-6"
        onClick={() => {
          props.setConfirmRidePopUpPanel(false);
        }}
      >
        <div className="absolute top-0 w-full h-1 bg-slate-200 rounded-bl-full rounded-br-full left-0"></div>

        <div className="w-24 rounded-bl-full rounded-br-full bg-slate-200 h-6 absolute top-0 left-36 px-10">
          <i className="ri-arrow-down-wide-line"></i>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-yellow-50 mb-5">
        Confirm to start <span className="text-[#9A6AFF]">Ride</span>
      </h3>

      <div className="flex justify-between items-center mb-4 p-2">
        <div className="flex items-center gap-3">
          <img
            src={User}
            alt="User"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h4 className="text-lg font-medium text-white">
            {props.currentUser?.firstName.charAt(0).toUpperCase() +
              props.currentUser?.firstName.slice(1) +
              " " +
              props.currentUser?.lastName || "N/A"}
          </h4>
        </div>

        <div>
          <h3 className="text-xl font-medium text-green-500">
            {"₹" + (props.currentRide?.cost || "N/A")}
          </h3>
          <p className="text-lg mt-1 text-gray-200">
            {props.currentRide?.distance + "KM" || "N/A"}
          </p>
        </div>
      </div>

      <div className="flex gap-3 justify-between flex-col items-center">
        <div className="w-full bg-[#fdfdfd] p-3 rounded-xl gap-3 my-2">
          <div className="flex items-center gap-5">
            <i className="ri-map-pin-user-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup Location</h3>
              <p className="text-sm mt-1 text-gray-600">
                {props.currentRide?.origin
                  ? props.currentRide.origin.charAt(0).toUpperCase() +
                    props.currentRide.origin.slice(1)
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="border border-[#3d404f2c] w-full my-3"></div>

          <div className="flex items-center gap-5">
            <i className="ri-map-pin-2-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">Drop-off Location</h3>
              <p className="text-sm mt-1 text-gray-600">
                {props.currentRide?.destination
                  ? props.currentRide.destination.charAt(0).toUpperCase() +
                    props.currentRide.destination.slice(1)
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-1 w-full">
          <form
            onSubmit={submitHandler}
            className="flex flex-col h-72 justify-between pb-5 gap-4"
          >
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              placeholder="Enter OTP"
              className="px-6 py-3 font-mono text-lg rounded-xl w-full mb-6"
            />
            <div className="flex flex-col justify-between gap-3">
              <button
                type="submit"
                className="w-full bg-[#9A6AFF] font-semibold p-3 rounded-xl text-center"
                onClick={() => {
                  navigate(
                    `/captain-riding?origin=${props.currentRide?.origin}&destination=${props.currentRide?.destination}&cost=${props.currentRide?.cost}`
                  );
                }}
              >
                Confirm
              </button>

              <button
                type="button"
                onClick={() => {
                  props.setConfirmRidePopUpPanel(false);
                  props.setRidePopUpPanel(false);
                }}
                className="w-full bg-orange-500 font-semibold p-3 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
