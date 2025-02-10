import React from "react";
import { useNavigate } from "react-router-dom";

const CaptainAboutPage = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen bg-[#1E2029] py-4 px-4 text-white">
            <div>
                <div
                    onClick={() => navigate("/about")}
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

                <div className="flex flex-col gap-2 mt-5 px-4">
                    <div>
                        <h2 className="text-sm">Vehical Information : <span className="text-lg font-mono">Suzuki Alto LXI</span></h2>
                        <div className="w-full h-0.5 bg-slate-400 mt-2 mb-4 rounded-full"></div>

                        <div className="grid grid-cols-2 gap-2 justify-between bg-white w-full rounded-xl px-2 items-center">
                            <div className="flex flex-col gap-1  text-black rounded-xl pl-3 py-2">
                                <div className="text-sm text-gray-500">Vehical Colour</div>
                                <div className="w-[70%] h-0.5 bg-slate-400 rounded-full"></div>
                                <div className="text-xl font-semibold">White</div>
                            </div>
                            <div className="flex flex-col gap-1 text-black rounded-xl pr-3 py-2">
                                <div className="text-sm text-gray-500">Vehical Plate</div>
                                <div className="w-[55%] h-0.5 bg-slate-400 rounded-full"></div>
                                <div className="text-xl font-semibold">GJ 11 DP 6467</div>
                            </div>
                            <div className="flex flex-col gap-1  text-black rounded-xl pl-3 py-2">
                                <div className="text-sm text-gray-500">Vehical Capacity</div>
                                <div className="w-[77%] h-0.5 bg-slate-400 rounded-full"></div>
                                <div className="text-xl font-semibold flex items-center gap-2">
                                    <div>4</div>
                                    <div><i class="ri-user-3-line text-lg font-thin"></i></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 text-black rounded-xl pr-3 py-2">
                                <div className="text-sm text-gray-500">Vehical Type</div>
                                <div className="w-[60%] h-0.5 bg-slate-400 rounded-full"></div>
                                <div className="text-xl font-semibold">Car</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-4 px-4">
                    <div>
                        <h2>Licence no.</h2>
                        <div className="w-full h-0.5 bg-slate-400 mt-2 mb-4 rounded-full"></div>

                        <div className="flex justify-between bg-white w-full rounded-xl px-2 items-center">
                            <div className="flex flex-col gap-1 text-black rounded-xl pr-3 py-2">
                                <div className="text-lg font-mono">xxxx 631564 xxxx</div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>

        </div>
    )
}

export default CaptainAboutPage