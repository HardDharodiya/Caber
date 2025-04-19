import React, { useState } from "react";
import car from "../assets/Car.webp";
import axios from "axios";
import Spinner from "./Spinner";

const ConfirmRide = (props) => {
  const [loading, setLoading] = useState(false);
  const submitHandler = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const cleanToken = token.replace(/"/g, "");
    console.log("Token:", cleanToken);

    axios
      .post(
        "https://caber-77w9.onrender.com/api/route/addPassenger",
        {
          routeId: props.route._id,
        },
        {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Ride booked Successfully");
          props.setConfirmRidePanel(false);
        } else if (res.status === 402) {
          alert("Insufficient Balance");
        } else if (res.status === 404) {
          alert("Route not found");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log("route", props.route);
  return (
    <div>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <Spinner />
        </div>
      )}
      <div
        className="opacity-1"
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
      >
        <div className="absolute top-0 w-full h-1 bg-slate-200 rounded-bl-full rounded-br-full left-0"></div>

        <div className="w-24 rounded-bl-full rounded-br-full bg-slate-200 h-6 absolute top-0 left-36 px-10">
          <i class="ri-arrow-down-wide-line"></i>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-yellow-50 mb-5">
        Confirm your <span className="text-[#9A6AFF]">Ride</span>
      </h3>

      <div className="flex gap-3 justify-between flex-col items-center">
        <img src={car} alt="" className="h-20 mb-3" />
        <div className="w-full bg-[#fdfdfd] p-3 rounded-xl gap-3 my-2">
          <div className=" flex items-center gap-5">
            <i className="ri-map-pin-user-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup Location</h3>
              <p className="text-sm mt-1 text-gray-600">
                {props.route?.origin.charAt(0).toUpperCase() +
                  props.route?.origin.slice(1)}
              </p>
            </div>
          </div>

          <div className="border border-[#3d404f2c] w-full my-3"></div>

          <div className="flex items-center gap-5">
            <i className="ri-map-pin-2-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">Drop-off Location</h3>
              <p className="text-sm mt-1 text-gray-600">
                {props.route?.destination.charAt(0).toUpperCase() +
                  props.route?.destination.slice(1)}
              </p>
            </div>
          </div>

          <div className="border border-[#3d404f2c] w-full my-3"></div>

          <div className="flex items-center gap-5">
            <i className="ri-currency-line text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">{"₹" + props.route?.cost}</h3>
              <p className="text-sm mt-1 text-gray-600">Payment</p>
            </div>
          </div>
        </div>
        <button
          onClick={submitHandler}
          className="w-full bg-[#9A6AFF] font-semibold p-3 rounded-xl"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
