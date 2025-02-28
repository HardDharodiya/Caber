import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/20241220_120541.png";
import axios from "axios";

const CaptainRideCreate = () => {
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
  // to console log userDat
  // useEffect(()=>{
  //   console.log(userData)
  // },[userData])

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
            Create new Ride !!
          </h3>

          <div className="flex gap-3 mb-5">
            <input
              required
              type="text"
              placeholder="From"
              className="bg-[#ffffff] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />

            <input
              required
              type="text"
              placeholder="To"
              className="bg-[#ffffff]  rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <h3 className="text-base mb-2 text-[#ffffff] font-medium">
            Date
          </h3>

          <input
            required
            type="date"
            className="bg-[#ffffff] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <h3 className="text-base font-medium mb-2 text-[#ffffff]">
            Time
          </h3>

          <input
            required
            type="time"
            className="bg-[#ffffff] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </form>

       
      </div>

      <div className="p-5 mb-2">
      <button
            className="mt-1 mb-1 flex items-center justify-center w-full bg-[#9A6AFF] text-[#ffffff] py-3 rounded-xl text-xl font-semibold"
            onClick={async () => {
              try {
                const response = await axios.post(
                  "http://localhost:3000/api/user/auth/signup",
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
                navigate("/captain-home");
              } catch (error) {
                if (error.response && error.response.status === 400) {
                  alert("Invalid input");
                } else {
                  alert("Something want wrong. Please try again.");
                }
              }
            }}
          >
            Create
          </button>
      </div>
    </div>
  );
};

export default CaptainRideCreate;
