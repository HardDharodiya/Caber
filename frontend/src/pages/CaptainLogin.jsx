import React, { useEffect, useState } from "react";
import logo from "../assets/20241220_120541.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainDate, setCaptainData] = useState({});
  const navigate = useNavigate();

  const submitHandller = (e) => {
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
  };

  // useEffect(()=>{
  //   console.log(captainDate)
  // },[captainDate])

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
            Captain's email
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
            className="bg-[#ffffff] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-lg"
          />

          <button
            className="mt-1 mb-1 flex items-center justify-center w-full bg-[#9A6AFF] text-[#ffffff] py-3 rounded-xl text-xl font-semibold"
            onClick={async () => {
              try {
                const response = await axios.post(
                  "https://caber-77w9.onrender.com/api/user/auth/login",
                  {
                    email,
                    password,
                    isCaptain: true,
                  }
                );
                console.log(response.data.token);
                localStorage.removeItem("token");
                localStorage.setItem("token", response.data.token);
                navigate("/captain-home");
              } catch (error) {
                if (error.response && error.response.status === 400) {
                  alert("Invalid email or password");
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
          Join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-500">
            Register as a Captain
          </Link>
        </p>
      </div>

      <div className="p-5 mb-2">
        <Link
          to="/login"
          className="flex items-center justify-center w-full bg-[#ffa302] text-black py-3 rounded-xl text-xl font-semibold"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
