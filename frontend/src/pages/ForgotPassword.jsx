import React, { useEffect, useState } from "react";
import logo from "../assets/20241220_120541.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [userDate, setUserData] = useState({});
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [submitbutton, setSubmitbutton] = useState(true);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://caber-77w9.onrender.com/api/user/sendOTP",
      {
        email,
      }
    );
    console.log(response.data);
    setShowOtpInput(true);
    setSubmitbutton(false);
    if (response.data.status == 200) {
      alert("OTP sent successfully");
    }
  };

  const otpHandler = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.post(
        "https://caber-77w9.onrender.com/api/user/verifyOTP",
        {
          email,
          otp,
        }
      );
      if (response.status == 200) {
        navigate("/home");
      } else {
        alert("server error");
      }
      console.log(response.data);
    } catch (err) {
      console.log(err);
      alert("server error");
    }
  };

  return (
    <div className="bg-[#1E2029] h-screen w-full flex flex-col justify-between">
      <div>
        <img src={logo} alt="" className="w-20 ml-3" />

        <form
          className="ml-5 mr-5 mb-5 mt-1 flex flex-col justify-between h-full"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div>
            <h3 className="text-lg mb-2 text-[#ffffff] font-medium">
              What's your email
            </h3>

            <input
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="yourid@xyz.com"
              className="bg-[#ffffff] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-lg"
            />

            {showOtpInput && (
              <>
                <h3 className="text-lg mb-2 text-[#ffffff] font-medium">
                  Enter OTP
                </h3>
                <input
                  required
                  type="number"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  placeholder="Enter OTP"
                  className="bg-[#ffffff] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-lg"
                />
              </>
            )}
          </div>
        </form>
      </div>

      <div className="p-5">
        {submitbutton && (
          <button
            type="submit"
            onClick={submitHandler}
            className="flex items-center justify-center w-full bg-[#ffa302] text-black py-3 rounded-xl text-xl font-semibold mb-5"
          >
            Submit
          </button>
        )}
        {!submitbutton && (
          <button
            type="submit"
            onClick={otpHandler}
            className="flex items-center justify-center w-full bg-[#9A6AFF] text-black py-3 rounded-xl text-xl font-semibold mb-5"
          >
            Verify
          </button>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
