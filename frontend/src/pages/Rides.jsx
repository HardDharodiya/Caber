import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Spinner from "../components/Spinner";

const Rides = () => {
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const confirmRidePopUpPanelRef = useRef(null);

  useGSAP(() => {
    gsap.to(confirmRidePopUpPanelRef.current, {
      y: confirmRidePopUpPanel ? "12%" : "100%", // Use 'y' instead of 'transform'
      duration: 0.5,
      ease: "power3.out",
    });
  }, [confirmRidePopUpPanel]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const cleanToken = token.replace(/"/g, "");
    axios
      .get("https://caber-77w9.onrender.com/api/route/get", {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
        },
      })
      .then((res) => {
        console.log("rides", res.data);
        setRides(res.data.routes);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="bg-[#1E2029] min-h-screen w-full flex flex-col">
        <div className="flex p-4">
          <div onClick={() => navigate("/captain-home")}>
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
         
            <div className="flex flex-col gap-4 p-4 overflow-auto max-h-[70%] mb-2 scrollbar-hide ">
              {rides.map((ride, index) => (
                <Ride
                  ride={ride}
                  key={ride._id || index}
                  setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
                  setSelectedRide={setSelectedRide}
                />
              ))}
            </div>
          
        )}
      </div>
      <div
        ref={confirmRidePopUpPanelRef}
        className="fixed bottom-0 left-0 w-full px-3 py-8 bg-gray-900"
      >
        {confirmRidePopUpPanel && (
          <ConfirmRidePopUp
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
            ride={selectedRide}
          />
        )}
      </div>
    </>
  );
};

const Ride = ({ ride, setConfirmRidePopUpPanel, setSelectedRide }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md w-[100%] font-semibold p-4"
      onClick={() => {
        if (ride.passengerName !== "N/A") {
          console.log("clicked");
          setSelectedRide(ride);
          setConfirmRidePopUpPanel(true);
        } else {
          alert("No passenger booked to this ride yet.");
        }
      }}
    >
      {/* Ride Route & Cost */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg capitalize">{`${ride.origin || "N/A"} to ${ride.destination || "N/A"
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

      {/* Passenger */}
      <div className="flex justify-between items-center pt-2">
        <span className="text-gray-600">Passenger:</span>
        <span className="text-black">
          {ride.passengerName.charAt(0).toUpperCase() +
            ride.passengerName.slice(1) || "N/A"}
        </span>
      </div>
    </div>
  );
};
export default Rides;
