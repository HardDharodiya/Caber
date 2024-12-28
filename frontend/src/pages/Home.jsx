import React, { useRef, useState } from "react";
import logo from "../assets/20241220_120512.png";
import map from "../assets/map.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);

  const submitHandler = () => {
    e.preventDefault();
  };

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
  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translatey(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translatey(100%)",
        });
      }
    },
    [vehiclePanel]
  );

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
          transform: "translatey(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translatey(100%)",
        });
      }
    },
    [vehicleFound]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <img src={logo} className="w-20 absolute left-5 top-0" />

      {/* map */}
      <div className="h-screen w-screen">
        {/*map img for temporary use*/}

        <img src={map} alt="" className="h-screen w-full" />
      </div>

      {/* find ride */}
      <div className="absolute h-screen top-0 w-full flex flex-col justify-end">
        <div className="h-[30%] bg-gray-900 p-5 relative">
          <h4 className="text-2xl font-semibold mb-5 text-white">
            Find a trip
          </h4>

          <div
            className="opacity-0"
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
          >
            <div className="absolute top-0 w-full h-1 bg-slate-200 rounded-bl-full rounded-br-full left-0"></div>

            <div className="w-24 rounded-bl-full rounded-br-full bg-slate-200 h-6 absolute top-0 left-36 px-10">
              <i class="ri-arrow-down-wide-line"></i>
            </div>
          </div>

          <form
            on
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-14 w-1 top-[45%]  rounded-lg left-10 bg-[#9A6AFF]"></div>

            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className="bg-gray-100 mb-3 rounded px-10 py-2  w-full text-base placeholder:text-lg"
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
              className="bg-gray-100  mb-3 rounded px-10 py-2  w-full text-base placeholder:text-lg"
              type="text"
              placeholder="Destination location"
            />
          </form>
        </div>

        <div ref={panelRef} className="bg-gray-900 h-0">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      {/* vehicle panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bottom-0 w-full px-3 py-8 translate-y-full bg-gray-900"
      >
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      {/* confirm ride panel */}
      <div
        ref={confirmRidePanelRef}
        className="fixed z-10 bottom-0 w-full px-3 py-8 translate-y-full bg-gray-900"
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/*vehicle found*/}
      <div
        ref={vehicleFoundRef}
        className="fixed z-10 bottom-0 w-full px-3 py-8 translate-y-full bg-gray-900"
      >
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>
    </div>
  );
};

export default Home;
