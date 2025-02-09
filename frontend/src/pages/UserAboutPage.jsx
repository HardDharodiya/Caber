import React from "react";
import { useNavigate } from "react-router-dom";

const UserAboutPage =()=>{
    const navigate = useNavigate();
    return (
        <div className="h-screen bg-[#1E2029] py-4 px-4 text-white">
            <div>
                <div
                    onClick={() => navigate("/user-about")}
                    className="flex items-center gap-4">
                    <i class="ri-arrow-left-line text-white text-2xl"></i>
                    <div className="font-normal text-xl">About</div>
                </div>

                <div className="flex flex-col gap-2 mt-4 px-4">
                    <div>
                        <h2>Name</h2>
                        <div className="w-full h-0.5 bg-slate-400 mt-2 mb-4 rounded-full"></div>

                        <div className="flex justify-between bg-white w-full rounded-xl px-2 items-center">
                            <div className="flex flex-col gap-1  text-black rounded-xl pl-3 py-2">
                                <div className="text-sm text-gray-500">First Name</div>
                                <div className="w-[100%] h-0.5 bg-slate-400 rounded-full"></div>
                                <div className="text-xl font-semibold">Hard</div>
                            </div>
                            <div className="bg-gray-200 h-14 rounded-full w-0.5">
                            </div>
                            <div className="flex flex-col gap-1 text-black rounded-xl pr-3 py-2">
                                <div className="text-sm text-gray-500">Last Name</div>
                                <div className="w-[70%] h-0.5 bg-slate-400 rounded-full"></div>
                                <div className="text-xl font-semibold">Dharodiya</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-4 px-4">
                    <div>
                        <h2>Email</h2>
                        <div className="w-full h-0.5 bg-slate-400 mt-2 mb-4 rounded-full"></div>

                        <div className="flex justify-between bg-white w-full rounded-xl px-2 items-center">
                            <div className="flex flex-col gap-1 text-black rounded-xl pr-3 py-2">
                                <div className="text-lg font-mono">hard.dummy00356@gmail.com</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserAboutPage