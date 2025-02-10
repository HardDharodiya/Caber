import React, { useRef, useState } from "react";
import map from "../assets/map.png";
import CaptainDetails from "../components/CaptainDetails";
// import { Link } from "react-router-dom";
import logo from "../assets/20241220_120512.png";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";



const CaptainHome = () => {
    const navigate = useNavigate();

    const [ ridePopUpPanel, setRidePopUpPanel ] = useState(true)
    const [ confirmRidePopUpPanel, setConfirmRidePopUpPanel ] = useState(false)                                     

    const ridePopUpPanelRef = useRef(null)
    const confirmRidePopUpPanelRef = useRef(null)
    

    //ride pop up panel
    useGSAP(
        function () {
            if (ridePopUpPanel) {
                gsap.to(ridePopUpPanelRef.current, {
                    transform: 'translateY(0%)'
                })
            } else {
                gsap.to(ridePopUpPanelRef.current, {
                    transform: 'translateY(100%)'
                })
            }
        },
        [ridePopUpPanel]
    );

    //confirm ride pop up panel
    useGSAP(
        function () {
            if (confirmRidePopUpPanel) {
                gsap.to(confirmRidePopUpPanelRef.current, {
                    transform: 'translateY(0%)'
                })
            } else {
                gsap.to(confirmRidePopUpPanelRef.current, {
                    transform: 'translateY(100%)'
                })
            }
        },
        [confirmRidePopUpPanel]
    );

    return (
        <div className="h-screen relative">
            <div>
                <img src={logo} alt="" className="w-20 absolute left-5 top-0" />
                <button className="fixed  h-10 w-10 bg-gray-900 flex items-center justify-center rounded-full right-4 top-4"
                    onClick={() => navigate('/captain-about')}
                >
                    <i className="ri-menu-line text-gray-200 text-lg font-medium"></i>
                </button>
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
                    <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
                </div>


                <div ref={confirmRidePopUpPanelRef} className="fixed w-full z-10 h-screen bottom-0 translate-y-full px-3 py-5 bg-gray-900">
                    <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
                </div>

            </div>


        </div>
    )
}



export default CaptainHome