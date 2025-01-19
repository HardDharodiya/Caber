import React, { useRef, useState } from "react";
import map from "../assets/map.png";
import CaptainDetails from "../components/CaptainDetails";
import { Link } from "react-router-dom";
import logo from "../assets/20241220_120512.png";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";



const CaptainHome = () => {

    const { ridePopUpPanel, setRidePopUpPanel } = useState(true)

    const ridePopUpPanelRef = useRef(null)

    useGSAP(
        function () {
            if (ridePopUpPanel) {
                gsap.to(ridePopUpPanelRef.current, {
                    transform: 'translateY(100%)'
                })
            } else {
                gsap.to(ridePopUpPanelRef.current, {
                    transform: 'translateY(0)'
                })
            }
        },
        [ridePopUpPanel]
    );


    return (
        <div className="h-screen relative">
            <div>
                <img src={logo} alt="" className="w-20 absolute left-5 top-0" />
                <Link className="fixed  h-10 w-10 bg-gray-900 flex items-center justify-center rounded-full right-4 top-4">
                    <i className="ri-menu-line text-gray-200 text-lg font-medium"></i>
                </Link>
            </div>

            <div className="h-screen w-screen">
                {/*map img for temporary use*/}
                <img src={map} alt="" className="h-[65%] w-full" />


                {/*Captains riding details*/}
                <div className="bg-gray-900 p-4 h-[35%] flex flex-col justify-between w-full">
                    <CaptainDetails />
                </div>

                {/*new user request for ride then this pop up is work */}
                <div ref={ridePopUpPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-8 bg-gray-900">
                    <RidePopUp setRidePopUpPanel={setRidePopUpPanel} />
                </div>

            </div>


        </div>
    )
}



export default CaptainHome