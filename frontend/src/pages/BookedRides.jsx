import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Spinner from "../components/Spinner";
import WaitingForDriver from "../components/WaitingForDriver";

const BookedRides = () => {
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [bookedRides, setBookedRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRide, setSelectedRide] = useState(null);
  // to open selected rides info

  const navigate = useNavigate();
  const waitingForDriverRef = useRef(null);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      y: waitingForDriver ? "12%" : "100%", // Use 'y' instead of 'transform'
      duration: 0.5,
      ease: "power3.out",
    });
  }, [waitingForDriver]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const cleanToken = token.replace(/"/g, "");
    axios
      .get("https://caber-77w9.onrender.com/api/route/bookedRides", {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
        },
      })
      .then((res) => {
        console.log("rides", res.data);
        setBookedRides(res.data.routes);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="bg-[#1E2029] min-h-screen w-full flex flex-col">
        <div className="flex p-4">
          <div onClick={() => navigate("/home")}>
            <i className="ri-arrow-left-line text-white text-2xl"></i>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="font-bold text-3xl text-white ">My Rides</div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4">
            {bookedRides.map((ride, index) => (
              <Ride
                ride={ride}
                key={ride._id || index}
                setWaitingForDriver={setWaitingForDriver}
                setSelectedRide={setSelectedRide}
              />
            ))}
          </div>
        )}
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed max-h-[50%] z-10 bottom-0 w-full px-3 py-8  bg-gray-900 overflow-auto scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <WaitingForDriver
          setWaitingForDriver={setWaitingForDriver}
          bookedRides={selectedRide}
        />
      </div>
    </>
  );
};

const Ride = ({ ride, setWaitingForDriver, setSelectedRide }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md w-[100%] font-semibold p-4"
      onClick={() => {
        console.log("clicked");
        setSelectedRide(ride);
        setWaitingForDriver(true);
      }}
    >
      {/* Ride Route & Cost */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg capitalize">{`${ride.origin || "N/A"} to ${
          ride.destination || "N/A"
        }`}</h2>
        <span className="text-xl font-bold text-green-600">
          ₹ {ride.cost || "N/A"}
        </span>
      </div>

      {/* Date & Time */}
      <div className="flex justify-between items-center border-b py-2">
        <span className="text-gray-600">Date:</span>
        <span className="text-black">
          {new Date(ride.dateTime).toUTCString()}
        </span>
      </div>

      {/* Distance */}
      <div className="flex justify-between items-center border-b py-2">
        <span className="text-gray-600">Distance:</span>
        <span className="text-black">
          {ride.distance ? `${ride.distance} KM` : "N/A"}
        </span>
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="text-gray-600">Driver:</span>
        <span className="text-black">
          {ride.driverName.charAt(0).toUpperCase() + ride.driverName.slice(1) ||
            "N/A"}
        </span>
      </div>
    </div>
  );
};
export default BookedRides;
