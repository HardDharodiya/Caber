import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const UserPayPg = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);

  return (
    <div className="h-screen bg-[#1E2029] py-4 px-4 text-white">
      <div>
        <div
          onClick={() => navigate("/user-about")}
          className="flex items-center gap-4"
        >
          <i class="ri-arrow-left-line text-white text-2xl"></i>
          <div className="font-medium text-lg">Wallet </div>
        </div>

        <div className="flex justify-between items-center p-4 mx-auto bg-white text-black rounded-2xl mt-5">
          <div className="mr-2">
            <div>
              <div className="font-bold text-lg">
                {" "}
                {userData?.user?.firstName || "N/A"}
              </div>
              <div className="font-mono text-lg">W no - 1234567890</div>
            </div>
          </div>

          <div className="bg-slate-300 h-16 rounded-full w-0.5"></div>

          <div>
            <div className="flex flex-col items-end">
              <div className="text-green-600 font-bold text-xl">
                {"₹" + userData?.user?.balance || "N/A"}
              </div>
              <div className="font-semibold text-sm">
                <span>
                  <i class="ri-wallet-3-line mr-2 "></i>
                </span>
                Balance
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6 mx-auto">
          {/* <div className="border rounded-lg w-full p-4 mb-11 bg-white">
            <div className="text-left text-lg font-semibold text-gray-800 mb-2">
              Transaction History
            </div>

            <div className="overflow-auto max-h-64 flex flex-col gap-1">
              <div className="text-center items-center justify-center border-y-2 p-2  text-black">
                dummy Data
              </div>

              <div className="text-center items-center justify-center border-y-2 p-2 text-black">
                dummy Data
              </div>

              <div className="text-center items-center justify-center border-y-2 p-2  text-black">
                dummy Data
              </div>

              <div className="text-center items-center justify-center border-y-2 p-2  text-black">
                dummy Data
              </div>

              <div className="text-center items-center justify-center border-y-2 p-2 text-black">
                dummy Data
              </div>

              <div className="text-center items-center border-y-2 justify-center p-2 text-black">
                dummy Data
              </div>
            </div>
          </div> */}
        </div>

        <button
          type="button"
          className="mt-8 mb-1
                     flex items-center justify-center w-full bg-green-500 text-black py-3 rounded-xl text-xl font-semibold"
          onClick={() => {
            navigate("/payment");
          }}
        >
          Add Balance
        </button>
      </div>
    </div>
  );
};

export default UserPayPg;
