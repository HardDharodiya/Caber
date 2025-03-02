import React, { useEffect, useRef, useState } from "react";
import map from "../assets/map.png";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSearchParams } from "react-router-dom";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const mapRef = useRef(null);
  const [searchParams] = useSearchParams();
  const distance = searchParams.get("distance");
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const cost = searchParams.get("cost");
  const routeId = searchParams.get("routeId");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        mapRef.current.innerHTML = `<iframe class="w-full h-full" src="https://maps.google.com/maps?q=${latitude},${longitude}&amp;z=15&amp;output=embed"></iframe>`;
      });
    }
  }, []);

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen ">
      <div
        ref={mapRef}
        className="h-[80vh] w-[100vw] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] bg-gray-200 shadow-lg rounded-lg overflow-hidden"
      ></div>

      <div className="h-[20%] bg-gray-900 p-5 relative">
        <div className="opacity-1 mb-2">
          <div className="w-24 rounded-bl-full rounded-br-full text-white font-semibold text-lg h-6 absolute top-0 left-36 px-10">
            <i className="ri-arrow-up-wide-line"></i>
          </div>
        </div>

        <div className="flex items-center justify-between  relative">
          <div className=" p-3 items-center justify-center flexflex-col text-lg text-white rounded-xl">
            <h4 className="text-green-600 font-semibold text-xl">
              {distance + "KM"}
            </h4>
            <h5>away</h5>
          </div>
          <button
            className=" bg-orange-500 p-4 px-6 rounded-2xl font-medium"
            onClick={() => {
              setFinishRidePanel(true);
            }}
          >
            Complete Ride
          </button>
        </div>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-8 bg-gray-900"
      >
        <FinishRide
          setFinishRidePanel={setFinishRidePanel}
          origin={origin}
          destination={destination}
          cost={cost}
          routeId={routeId}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
