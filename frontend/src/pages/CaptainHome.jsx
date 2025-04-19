import React, { useEffect, useRef, useState } from "react";
import CaptainDetails from "../components/CaptainDetails";
import logo from "../assets/20241220_120512.png";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const CaptainHome = () => {
  const navigate = useNavigate();

  const [ridePopUpPanel, setRidePopUpPanel] = useState(true);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [currentRide, setCurrentRide] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        mapRef.current.innerHTML = `<iframe class="w-full h-full" src="https://maps.google.com/maps?q=${latitude},${longitude}&amp;z=15&amp;output=embed"></iframe>`;
      });
    }
  }, []);

  //ride pop up panel
  useGSAP(
    function () {
      if (ridePopUpPanel) {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopUpPanel]
  );

  //confirm ride pop up panel
  useGSAP(
    function () {
      if (confirmRidePopUpPanel) {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopUpPanel]
  );

  return (
    <div className="h-screen relative">
      <div className="h-[5%]">
        <img src={logo} alt="" className="w-20 absolute left-5 top-6" />
        <button
          className="fixed  h-10 w-10 bg-gray-900 flex items-center justify-center rounded-full right-4 top-4"
          onClick={() => navigate("/about")}
        >
          <i className="ri-menu-line text-gray-200 text-lg font-medium"></i>
        </button>
      </div>

      <div className="h-screen w-screen">
        {/*map img for temporary use*/}
        <div
          ref={mapRef}
          className="h-[65vh] w-[100vw] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] bg-gray-200 shadow-lg rounded-lg overflow-hidden"
        ></div>

        {/*Captains riding details*/}
        <div className="bg-gray-900 p-4 h-[30%] flex flex-col justify-between w-full">
          <CaptainDetails />
        </div>

        <div
          ref={confirmRidePopUpPanelRef}
          className="fixed w-full z-10 h-screen bottom-0 translate-y-full px-3 py-5 bg-gray-900"
        >
          <ConfirmRidePopUp
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
            setRidePopUpPanel={setRidePopUpPanel}
            currentRide={currentRide}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
