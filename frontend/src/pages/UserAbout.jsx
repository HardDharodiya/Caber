import React from "react";
import { useNavigate } from "react-router-dom";

const UserAbout = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="h-screen bg-[#1E2029] p-5">
      <div onClick={() => navigate("/home")}>
        <i class="ri-arrow-left-line text-white text-2xl"></i>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1 mt-2">
          <h4 className="text-2xl font-serif text-white">Hello</h4>
        </div>
        <div className="w-full h-0.5 bg-slate-400 mt-2 rounded-full"></div>
      </div>

      <div className="px-5 flex flex-col justify-between h-[80%]">
        <div className="flex flex-col gap-3">
          <div
            onClick={() => navigate("/user-aboutpg")}
            className="w-full h-11 bg-white flex justify-between items-center p-3 px-4 rounded-xl "
          >
            <h2 className="text-lg font-semibold">About</h2>
            <i class="ri-information-2-line text-xl"></i>
          </div>
          <div
            onClick={() => navigate("/user-paypg")}
            className="w-full h-11 bg-white flex justify-between items-center p-3 px-4 rounded-xl "
          >
            <h2 className="text-lg font-semibold">Wallet</h2>
            <i class="ri-wallet-3-line text-lg"></i>
          </div>
        </div>
        <div className="bottom-0 flex justify-center items-center w-full">
          <button
            onClick={handleSubmit}
            type="button"
            className="mt-8 mb-1
          flex items-center justify-center w-full bg-orange-500 text-black py-3 rounded-xl text-xl font-semibold"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAbout;
