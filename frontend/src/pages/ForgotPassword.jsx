import React, { useEffect, useState } from "react";
import logo from "../assets/20241220_120541.png";
import { Link, useNavigate } from "react-router-dom";

export const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDate, setUserData] = useState({});
  const navigate = useNavigate();

  const submitHandller = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
    console.log(userDate);
  };

  return (
    <div className="bg-[#1E2029] h-screen w-full flex flex-col justify-between">
      <div>
        <img src={logo} alt="" className="w-20 ml-3" />

        <form
          className="ml-5 mr-5 mb-5 mt-1"
          onSubmit={(e) => {
            submitHandller(e);
          }}
        >
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

         
        </form>

      </div>

      <div className="p-5 mb-2">
        <Link
          // to="/captain-login"
          className="flex items-center justify-center w-full bg-[#ffa302] text-black py-3 rounded-xl text-xl font-semibold"
        >
          Submit
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;