import React, { useState } from "react";
import car from "../assets/Car.webp";
import User from "../assets/dummy-user.jpg";
import axios from "axios";

const WaitingForDriver = (props) => {
  const [email, setEmail] = useState(null);
  const submitHandler = async () => {
    const response = await axios.post(
      "https://caber-77w9.onrender.com/api/user/sendOTP",
      {
        email,
      }
    );
    console.log("res: fd", response.data);
    if (response.status == 200) {
      alert("OTP sent successfully");
    }
  };
  return (
    <div className="max-h-[50%]">
      <div
        className="opacity-1 "
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
      >
        <div className="absolute top-0 w-full h-1 bg-slate-200 rounded-bl-full rounded-br-full left-0"></div>

        <div className="w-24 rounded-bl-full rounded-br-full bg-slate-200 h-6 absolute top-0 left-36 px-10">
          <i className="ri-arrow-down-wide-line"></i>
        </div>
      </div>

      {/* Driver and Car detail*/}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={car} alt="" className="h-14 bg-white rounded-xl" />
          <img src={User} alt="" className="h-12 rounded-full" />
        </div>
        <div className="text-white text-right">
          <h2 className="text-lg font-medium -mt-1 -mb-1">
            {props.bookedRides?.driverName.charAt(0).toUpperCase() +
              props.bookedRides?.driverName.slice(1)}
          </h2>
          <h4 className="text-xl font-semibold">
            {props.bookedRides?.vehicleNumber || "N/A"}
          </h4>
          <p className="text-sm text-gray-200">Suzuki Alto LXI</p>
        </div>
      </div>

      <div className="flex justify-around">
        <div className="bg-gray-300 w-[60%] flex p-3 rounded-xl justify-between items-center my-3">
          <input
            type="text"
            placeholder="Enter your Email"
            className="w-[85%] bg-gray-300 placeholder:text-gray-800"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button>
            <i className="ri-send-plane-2-fill"></i>
          </button>
        </div>
        <button
          className="my-3 mx-3 w-[30%]  bg-[#9A6AFF] text-[#ffffff] py-3 rounded-xl text-xl font-semibold"
          onClick={submitHandler}
        >
          SendOTP
        </button>
      </div>

      <div className="text-white flex justify-between items-center p-4 my-1 mx-1">
        <div className="flex flex-col justify-center items-center">
          <i className="ri-shield-user-line text-2xl font-thin bg-gray-200 text-gray-900 p-1 w-10 text-center rounded-full mb-2"></i>
          <p>Safety</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <i className="ri-map-pin-range-line text-2xl font-thin bg-gray-200 text-gray-900 p-1 w-10 text-center rounded-full mb-2"></i>
          <p>Share my trip</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <i className="ri-phone-fill text-2xl font-thin bg-gray-200 text-gray-900 p-1 w-10 text-center rounded-full mb-2"></i>
          <p>Call driver</p>
        </div>
      </div>

      {/* location and fair */}
      <div className="flex gap-3 justify-between flex-col items-center">
        <div className="w-full bg-[#fdfdfd] p-3 rounded-xl gap-3 my-2">
          <div className=" flex items-center gap-5">
            <i className="ri-map-pin-user-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm mt-1 text-gray-600">
                {props.bookedRides?.origin?.charAt(0).toUpperCase() +
                  props.bookedRides?.origin?.slice(1)}
              </p>
            </div>
          </div>

          <div className="border border-[#3d404f2c] w-full my-3"></div>

          <div className="flex items-center gap-5">
            <i className="ri-map-pin-2-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm mt-1 text-gray-600">
                {props.bookedRides?.destination?.charAt(0).toUpperCase() +
                  props.bookedRides?.destination?.slice(1)}
              </p>
            </div>
          </div>

          <div className="border border-[#3d404f2c] w-full my-3"></div>

          <div className="flex items-center gap-5">
            <i className="ri-currency-line text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">
                {"₹" + props.bookedRides?.cost}
              </h3>
              <p className="text-sm mt-1 text-gray-600">Payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
