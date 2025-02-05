import React from "react";
import User from "../assets/dummy-user.jpg";
import { useNavigate } from "react-router-dom";

const CaptainAboutPanle = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-[#1E2029] p-5">
      <div onClick={() => navigate("/captain-home")}>
        <i class="ri-arrow-left-line text-white text-2xl"></i>
      </div>
      <div className="flex flex-col items-center gap-1">
        <img
          src={User}
          alt=""
          className="h-20 w-20 rounded-full object-cover"
        />
        <h4 className="text-lg font-medium text-white">Pratham Kukadiya</h4>
        <h5 className="text-lg font-medium text-white">(Captain)</h5>
      </div>
    </div>
  );
};

export default CaptainAboutPanle;
