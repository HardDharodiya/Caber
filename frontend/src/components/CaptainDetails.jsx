import React from "react";
import User from "../assets/dummy-user.jpg"

const CaptainDetails = () => {
    return (

        <div className="flex flex-col justify-between gap-2">

            <div className="flex justify-between items-center m-2">

                <div className="flex justify-between items-center gap-3">
                    <img src={User} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <h4 className="text-lg font-medium text-white">Hard Dharodiya</h4>
                </div>

                <div>
                    <h4 className="text-xl font-semibold text-green-500">₹295.20</h4>
                    <p className="text-sm text-gray-200">Earned</p>
                </div>

            </div>


            <div className="flex w-full justify-around bg-slate-100 p-4 rounded-2xl mt-2">

                <div className="text-center">
                    <i className="ri-timer-2-line text-3xl mb-3 font-thin"></i>
                    <h5 className="text-lg font-medium">10.2</h5>
                    <p className="text-sm text-gray-600">Hours Online</p>
                </div>

                <div className="text-center">
                    <i className="ri-speed-up-line text-3xl mb-3 font-thin"></i>
                    <h5 className="text-lg font-medium">10.2</h5>
                    <p className="text-sm text-gray-600">Hours Online</p>
                </div>

                <div className="text-center">
                    <i className="ri-booklet-line text-3xl mb-3 font-thin"></i>
                    <h5 className="text-lg font-medium">10.2</h5>
                    <p className="text-sm text-gray-600">Hours Online</p>
                </div>

            </div>

        </div>

    )
}

export default CaptainDetails