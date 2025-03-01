import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import User from "../assets/dummy-user.jpg";

const FinishRide = (props) => {
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

        <Link
          to="/captain-home"
          className="w-full bg-[#9A6AFF] font-semibold p-3 rounded-xl text-center"
        >
          Finish Ride
        </Link>
      </div>
    </div>
  );
};

export default FinishRide;
