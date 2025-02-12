import React, { useEffect, useState } from "react";
import logo from "../assets/20241220_120541.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
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

  // useEffect(()=>{
  //   console.log(userDate)
  // },[userDate])

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

          <h3 className="text-lg font-medium mb-2 text-[#ffffff]">
            Enter Password
          </h3>

          <input
            required
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
            className="bg-[#ffffff] mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-lg"
          />
          <Link to="/forgot-password" className="text-blue-500 ">Forgot Password ?</Link>

          <button
            className="mt-6 mb-1 flex items-center justify-center w-full bg-[#9A6AFF] text-[#ffffff] py-3 rounded-xl text-xl font-semibold"
            onClick={async () => {
              try {
                const response = await axios.post(
                  "http://localhost:3000/api/user/auth/signin",
                  {
                    email,
                    password,
                    isCaptain: false,
                  }
                );
                console.log(response.data.token);
                localStorage.removeItem("token");
                localStorage.setItem("token", response.data.token);
                navigate("/Home");
              } catch (error) {
                if (error.response && error.response.status === 400) {
                  alert("Invalid input");
                } else {
                  alert("Something want wrong. Please try again.");
                }
              }
            }}
          >
            Login
          </button>
        </form>

        <p className="text-white text-center">
          New here?{" "}
          <Link to="/signup" className="text-blue-500">
            Create new Account
          </Link>
        </p>
      </div>

      <div className="p-5 mb-2">
        <Link
          to="/captain-login"
          className="flex items-center justify-center w-full bg-[#ffa302] text-black py-3 rounded-xl text-xl font-semibold"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
