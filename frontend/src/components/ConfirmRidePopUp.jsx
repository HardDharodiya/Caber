import React, { useState } from "react";
import User from "../assets/dummy-user.jpg"
import { Link } from "react-router-dom";


const ConfirmRidePopUp = (props) => {

    const[otp,setOtp]=useState('')

    const submitHandler=(e)=>{
        e.preventDefault()
    }

    return (
        <div className="h-screen w-full">

            <div
                className="opacity-1 mb-6"
                onClick={() => {
                    props.setConfirmRidePopUpPanel(false);
                }}
            >
                <div className="absolute top-0 w-full h-1 bg-slate-200 rounded-bl-full rounded-br-full left-0"></div>

                <div className="w-24 rounded-bl-full rounded-br-full bg-slate-200 h-6 absolute top-0 left-36 px-10">
                    <i className="ri-arrow-down-wide-line"></i>
                </div>
            </div>

            <h3 className="text-2xl font-semibold text-yellow-50 mb-5">
                Confirm to start <span className="text-[#9A6AFF]">Ride</span>
            </h3>

            <div className="flex justify-between items-center mb-4 p-2">

                <div className="flex items-center gap-3">
                    <img src={User} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <h4 className="text-lg font-medium text-white">Pratham Kukadiya</h4>
                </div>

                <div>
                    <h3 className="text-xl font-medium text-green-500">₹193.20</h3>
                    <p className="text-lg mt-1 text-gray-200">2.2 KM</p>
                </div>

            </div>

            <div className="flex gap-3 justify-between flex-col items-center">

                <div className="w-full bg-[#fdfdfd] p-3 rounded-xl gap-3 my-2">
                    <div className=" flex items-center gap-5">
                        <i className="ri-map-pin-user-fill text-lg"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm mt-1 text-gray-600">Kankariya Talab, Ahmedabad</p>
                        </div>
                    </div>

                    <div className='border border-[#3d404f2c] w-full my-3'></div>

                    <div className="flex items-center gap-5">
                        <i className="ri-map-pin-2-fill text-lg"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm mt-1 text-gray-600">Kankariya Talab, Ahmedabad</p>
                        </div>
                    </div>

                </div>

                <div className="mt-1 w-full">
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }} className="flex flex-col h-72 justify-between pb-5 gap-4">
                        <input value={otp} onChange={(e)=>setOtp(e.target.value)} type="text" placeholder="Enter otp" className="px-6 py-3 font-mono text-lg rounded-xl w-full mb-6 " />
                        <div className="flex flex-col justify-between gap-3">
                            <Link to='/captain-riding'
                                className="w-full bg-[#9A6AFF] font-semibold p-3 rounded-xl text-center">Confirm</Link>

                            <button
                                onClick={() => {
                                    props.setConfirmRidePopUpPanel(false)
                                    props.setRidePopUpPanel(false)
                                }}
                                className="w-full bg-orange-500 font-semibold p-3 rounded-xl">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default ConfirmRidePopUp