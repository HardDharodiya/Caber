import React from "react";
import User from "../assets/dummy-user.jpg"



const RidePopUp = (props) => {
    return (
        <div>
            <h3 className="text-2xl font-semibold text-yellow-50 mb-5">
                New <span className="text-[#9A6AFF]">Ride</span> Available!
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
                <button
                    onClick={() => {

                    }}
                    className="w-full bg-[#9A6AFF] font-semibold p-3 rounded-xl">Confirm</button>

                <button
                    onClick={() => {
                        props.setRidePopUpPanel(false)
                    }}
                    className="w-full bg-orange-500 font-semibold p-3 rounded-xl">Ignore</button>

            </div>
        </div>
    )
}

export default RidePopUp