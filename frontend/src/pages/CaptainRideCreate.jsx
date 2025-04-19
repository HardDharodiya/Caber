import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/20241220_120541.png";
import axios from "axios";
import Spinner from "../components/Spinner";

const CaptainRideCreate = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log("token: ", token);

    const cleanToken = token.replace(/"/g, "");
    console.log("cleanToken: ", cleanToken);
    axios
      .post(
        "https://caber-77w9.onrender.com/api/route/create",
        {
          source: from,
          destination: to,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          alert("Ride Created Successfully");
          navigate("/captain-home");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-[#1E2029] h-screen w-full flex flex-col justify-between">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <Spinner />
        </div>
      )}
      <div>
        <img src={logo} alt="" className="w-20 ml-3" />

        <form
          className="ml-5 mr-5 mb-5 mt-1"
          onSubmit={(e) => {
            submitHandler(e);
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
              onChange={(e) => {
                setFrom(e.target.value);
              }}
            />

            <input
              required
              type="text"
              placeholder="To"
              className="bg-[#ffffff]  rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              onChange={(e) => {
                setTo(e.target.value);
              }}
            />
          </div>

          <h3 className="text-base mb-2 text-[#ffffff] font-medium">Date</h3>

          <input
            required
            type="date"
            className="bg-[#ffffff] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />

          <h3 className="text-base font-medium mb-2 text-[#ffffff]">Time</h3>

          <input
            required
            type="time"
            className="bg-[#ffffff] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
        </form>
      </div>

      <div className="p-5 mb-2">
        <button
          className="mt-1 mb-1 flex items-center justify-center w-full bg-[#9A6AFF] text-[#ffffff] py-3 rounded-xl text-xl font-semibold"
          onClick={submitHandler}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CaptainRideCreate;
