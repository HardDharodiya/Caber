import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/20241220_120541.png";
import axios from "axios";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserDate] = useState({});
  const navigate = useNavigate();

  const submitHandller = (e) => {
    e.preventDefault();
    setUserDate({
      username: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
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
          <h3 className="text-base mb-2 text-[#ffffff] font-medium">
            What's your name
          </h3>

          <div className="flex gap-3 mb-5">
            <input
              required
              type="text"
              placeholder="First name"
              className="bg-[#ffffff] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />

            <input
              required
              type="text"
              placeholder="Last name"
              className="bg-[#ffffff]  rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <h3 className="text-base mb-2 text-[#ffffff] font-medium">
            What's your email
          </h3>

          <input
            required
            type="email"
            placeholder="yourid@xyz.com"
            className="bg-[#ffffff] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <h3 className="text-base font-medium mb-2 text-[#ffffff]">
            Enter Password
          </h3>

          <input
            required
            type="password"
            placeholder="password"
            className="bg-[#ffffff] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button
            className="mt-1 mb-1 flex items-center justify-center w-full bg-[#9A6AFF] text-[#ffffff] py-3 rounded-xl text-xl font-semibold"
            onClick={async () => {
              try {
                const response = await axios.post(
                  "https://caber-77w9.onrender.com/api/user/auth/signup",
                  {
                    email,
                    firstName,
                    lastName,
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
            Sign up
          </button>
        </form>

        <p className="text-white text-center">
          Already have an account ?{" "}
          <Link to="/login" className="text-blue-500">
            Login here
          </Link>
        </p>
      </div>

      <div className="p-5 mb-2">
        <div className="border border-[#232633] w-full mb-6"></div>

        <p className="text-white text-xs p-2">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline text-blue-500">Google Privacy Policy</span>{" "}
          and <span className="underline text-blue-500">Terms of Service</span>{" "}
          apply
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
