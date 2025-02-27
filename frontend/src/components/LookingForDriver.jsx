import React from "react";
import car from "../assets/Car.webp";

const LookingForDriver = (props) => {
  return (
    <div>
      <div
        className="opacity-1"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <div className="absolute top-0 w-full h-1 bg-slate-200 rounded-bl-full rounded-br-full left-0"></div>

        <div className="w-24 rounded-bl-full rounded-br-full bg-slate-200 h-6 absolute top-0 left-36 px-10">
          <i class="ri-arrow-down-wide-line"></i>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-yellow-50 mb-5">
        Looking for a <span className="text-[#9A6AFF]">Driver</span>
      </h3>

      <div className="flex gap-3 justify-between flex-col items-center">
        <img src={car} alt="" className="h-20 mb-3" />
        <div className="w-full bg-[#fdfdfd] p-3 rounded-xl gap-3 my-2">
          <div className=" flex items-center gap-5">
            <i className="ri-map-pin-user-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm mt-1 text-gray-600">
                Kankariya Talab, Ahmedabad
              </p>
            </div>
          </div>

          <div className="border border-[#3d404f2c] w-full my-3"></div>

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
    </div>
  );
};

export default LookingForDriver;
