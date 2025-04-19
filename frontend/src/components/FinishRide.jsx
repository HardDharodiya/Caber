import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "../assets/dummy-user.jpg";
import axios from "axios";

const FinishRide = (props) => {
  const navigate = useNavigate();
  const submitHandler = () => {
    const token = localStorage.getItem("token");
    const cleanToken = token.replace(/"/g, "");
    axios
      .post(
        "https://caber-77w9.onrender.com/api/route/finishRoute",
        { routeId: props.routeId },
        {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        console.log(res.status);
        if (res.status == 200) {
          alert("Ride finished");
          navigate("/captain-home");
        } else {
          alert("Internal Server error. Please try again!");
        }
      });
  };
  return (
    <div className=" w-full">
      <h3 className="text-2xl font-semibold text-yellow-50 mb-5">
        Finish this <span className="text-[#9A6AFF]">Ride</span>
      </h3>

      <div className="flex justify-between items-center mb-4 p-2">
        <div className="flex items-center gap-3">
          <img
            src={User}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <h4 className="text-lg font-medium text-white">Pratham Kukadiya</h4>
        </div>

        <div>
          <h3 className="text-xl font-medium text-green-500">
            {"₹" + props.cost}
          </h3>
        </div>
      </div>

      <div className="flex gap-3 justify-between flex-col items-center">
        <div className="w-full bg-[#fdfdfd] p-3 rounded-xl gap-3 my-2">
          <div className=" flex items-center gap-5">
            <i className="ri-map-pin-user-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup Location</h3>
              <p className="text-sm mt-1 text-gray-600">
                {props.origin.charAt(0).toUpperCase() + props.origin.slice(1)}
              </p>
            </div>
          </div>

          <div className="border border-[#3d404f2c] w-full my-3"></div>

          <div className="flex items-center gap-5">
            <i className="ri-map-pin-2-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">Drop-off Location</h3>
              <p className="text-sm mt-1 text-gray-600">
                {props.destination.charAt(0).toUpperCase() +
                  props.destination.slice(1)}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={submitHandler}
          className="w-full bg-[#9A6AFF] font-semibold p-3 rounded-xl text-center"
        >
          Finish Ride
        </button>
      </div>
    </div>
  );
};

export default FinishRide;
