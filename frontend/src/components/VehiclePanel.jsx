import React from "react";
import car from "../assets/Car.webp";
import moto from "../assets/moto.webp";
import auto from "../assets/auto.webp";

const VehiclePanel = ({
  setVehiclePanel,
  setConfirmRidePanel,
  setVehicleType,
}) => {
  return (
    <div>
      <div
        className="opacity-1"
        onClick={() => {
          setVehiclePanel(false);
        }}
      >
        <div className="absolute top-0 w-full h-1 bg-slate-200 rounded-bl-full rounded-br-full left-0"></div>

        <div className="w-24 rounded-bl-full rounded-br-full bg-slate-200 h-6 absolute top-0 left-36 px-10">
          <i class="ri-arrow-down-wide-line"></i>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-yellow-50 mb-5">
        Choose your Vehicle
      </h3>

      <div
        className="flex border-4 items-center mb-3 justify-between w-full border-[#fdfdfd] bg-[#fdfdfd] p-2 active:border-[#9A6AFF] rounded-2xl"
        onClick={() => {
          setVehicleType("car");
          setConfirmRidePanel(true);
          setVehiclePanel(false);
        }}
      >
        <img className="h-10" src={car} alt="" />

        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Car{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>

          <h5 className="font-medium text-sm">2 mins away</h5>

          <p className="font-medium text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹193.20</h2>
      </div>

      <div
        className="flex border-4 items-center mb-3 justify-between w-full border-[#fdfdfd] bg-[#fdfdfd] p-2 active:border-[#9A6AFF] rounded-2xl"
        onClick={() => {
          setVehicleType("moto");
          setConfirmRidePanel(true);
          setVehiclePanel(false);
        }}
      >
        <img className="h-10" src={moto} alt="" />

        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>

          <h5 className="font-medium text-sm">3 mins away</h5>

          <p className="font-medium text-xs text-gray-600">
            Affordable motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹65.27</h2>
      </div>

      <div
        className="flex border-4 items-center mb-3 justify-between w-full border-[#fdfdfd] bg-[#fdfdfd] p-2 active:border-[#9A6AFF] rounded-2xl"
        onClick={() => {
          setVehicleType("auto");
          setConfirmRidePanel(true);
          setVehiclePanel(false);
        }}
      >
        <img className="h-10" src={auto} alt="" />

        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Auto{" "}
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>

          <h5 className="font-medium text-sm">2 mins away</h5>

          <p className="font-medium text-xs text-gray-600">
            Affordable Auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹118.21</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
