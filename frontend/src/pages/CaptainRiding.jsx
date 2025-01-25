import React, { useRef, useState } from "react";
import map from "../assets/map.png";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(true)
    const finishRidePanelRef = useRef(null)


    useGSAP(
        function () {
            if (finishRidePanel) {
                gsap.to(finishRidePanelRef.current, {
                    transform: 'translateY(0)'
                })
            } else {
                gsap.to(finishRidePanelRef.current, {
                    transform: 'translateY(70%)'
                })
            }
        },
        [finishRidePanel]
    );

    return (
        <div className="h-screen ">
            <img src={map} alt="" className="h-[80%] w-full" />

            <div className="h-[20%] bg-gray-900 p-5 relative"
                onClick={() => {
                    setFinishRidePanel(false);
                }}>

                <div className="opacity-1 mb-2">
                    <div className="w-24 rounded-bl-full rounded-br-full text-white font-semibold text-lg h-6 absolute top-0 left-36 px-10">
                        <i className="ri-arrow-up-wide-line"></i>
                    </div>
                </div>

                <div className="flex items-center justify-between  relative">
                    <div className=" p-3 items-center justify-center flexflex-col text-lg text-white rounded-xl">
                        <h4 className="text-green-600 font-semibold text-xl">4.0 KM</h4>
                        <h5>away</h5>
                    </div>
                    <button
                        className=" bg-orange-500 p-4 px-6 rounded-2xl font-medium">
                        Complete Ride
                    </button>
                </div>
            </div>

            <div ref={finishRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-8 bg-gray-900">
                <FinishRide setFinishRidePanel={setFinishRidePanel} />
            </div>

        </div>
    )
}


export default CaptainRiding