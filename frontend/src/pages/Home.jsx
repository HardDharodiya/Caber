import React, { useRef, useState, useEffect } from "react";
import logo from "../assets/20241220_120512.png";
import map from "../assets/map.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { useNavigate } from "react-router-dom";
import { getbookedRides } from "../utils/getUserData";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  // const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [route, setRoute] = useState(null);
  const [bookedRides, setBookedRides] = useState();

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  // const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRides = async () => {
      const rides = await getbookedRides();
      if (rides) {
        setBookedRides(rides);
      }
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        mapRef.current.innerHTML = `<iframe class="w-full h-full" src="https://maps.google.com/maps?q=${latitude},${longitude}&amp;z=15&amp;output=embed"></iframe>`;
      });
    }
    fetchRides();
  }, []);

  //location panel open and close
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 20,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  //vehical panel
  // useGSAP(
  //   function () {
  //     if (vehiclePanel) {
  //       gsap.to(vehiclePanelRef.current, {
  //         transform: "translatey(0)",
  //       });
  //     } else {
  //       gsap.to(vehiclePanelRef.current, {
  //         transform: "translatey(100%)",
  //       });
  //     }
  //   },
  //   [vehiclePanel]
  // );

  //confirm ride panel
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translatey(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translatey(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  //vehicle found
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translatey(0%)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translatey(100%)",
        });
      }
    },
    [vehicleFound]
  );

  //waiting for deiver
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translatey(10%)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translatey(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="pt-10 h-[5vh]">
        <img src={logo} alt="" className="w-20 absolute left-5 top-0 pt-3" />
        <button
          onClick={() => navigate("/user-about")}
          className="fixed  h-10 w-10 bg-gray-900 flex items-center justify-center rounded-full right-4 top-4"
        >
          <i className="ri-menu-line text-gray-200 text-lg font-medium"></i>
        </button>
      </div>

      {/* map */}
      <div className="h-screen w-screen justify-center items-center">
        {/*map img for temporary use*/}
        <div
          ref={mapRef}
          className="h-[60vh] w-[100vw] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] bg-gray-200 shadow-lg rounded-lg overflow-hidden"
        ></div>
      </div>

      {/* find ride */}
      <div className="absolute h-screen top-0 w-full flex flex-col justify-end pointer-events-none">
        <div className="h-[30%] bg-gray-900 p-5 relative pointer-events-auto">
          <div className="flex justify-between items-center">
            <h4 className="text-2xl font-semibold mb-5 text-white">
              Find a trip
            </h4>
            <button
              className="mb-5 mx-3 w-[50%] bg-[#9A6AFF] text-[#ffffff] py-3 rounded-xl text-xl font-semibold"
              onClick={() => {
                if (!bookedRides) {
                  alert(`You don't have any booked ride now!`);
                  return;
                }
                console.log("bookedRides", bookedRides);
                navigate("/booked-rides");
              }}
            >
              Booked Ride
            </button>
          </div>
          <div
            className="opacity-0"
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
          >
            <div className="absolute top-0 w-full h-1 bg-slate-200 rounded-bl-full rounded-br-full left-0"></div>

            <div className="w-24 rounded-bl-full rounded-br-full bg-slate-200 h-6 absolute top-0 left-36 px-10">
              <i className="ri-arrow-down-wide-line"></i>
            </div>
          </div>

          <form>
            <div className="line absolute h-14 w-1 top-[45%]  rounded-lg left-10 bg-[#9A6AFF]"></div>

            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className="bg-gray-100 mb-3 rounded px-10 py-2  w-full text-base placeholder:text-lg pointer-events-auto"
              type="text"
              placeholder="Pick-up location"
            />

            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-gray-100 rounded px-10 py-2  w-full text-base placeholder:text-lg pointer-events-auto"
              type="text"
              placeholder="Destination location"
            />
          </form>
        </div>

        <div ref={panelRef} className="bg-gray-900 h-0 pointer-events-auto">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            pickup={pickup}
            destination={destination}
            setConfirmRidePanel={setConfirmRidePanel}
            setRoute={setRoute}
            // setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      {/* vehicle panel */}
      {/* <div
        ref={vehiclePanelRef}
        className="fixed z-10 bottom-0 w-full px-3 py-8 translate-y-full bg-gray-900"
      >
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleType={setVehicleType}
        />
      </div> */}

      {/* confirm ride panel */}
      <div
        ref={confirmRidePanelRef}
        className="fixed z-10 bottom-0 w-full px-3 py-8 translate-y-full bg-gray-900"
      >
        <ConfirmRide
          route={route}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/*vehicle found*/}
      <div
        ref={vehicleFoundRef}
        className="fixed z-10 bottom-0 w-full px-3 py-8 translate-y-full bg-gray-900"
      >
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>

      {/*Waition for driver*/}
      {/* <div
        ref={waitingForDriverRef}
        className="fixed max-h-[50%] z-10 bottom-0 w-full px-3 py-8  bg-gray-900 overflow-auto scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <WaitingForDriver
          setWaitingForDriver={setWaitingForDriver}
          bookedRides={bookedRides}
        />
      </div> */}
    </div>
  );
};

export default Home;
