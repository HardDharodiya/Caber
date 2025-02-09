const PayPg = () => {
    return (
        <div className="min-h-screen bg-[#1E2029] p-5 text-white">
            <div>
                <div className="flex justify-between items-center p-4 mx-auto">

                    <div className="mr-2">
                        <div>
                            <div className="font-bold text-lg">John Doe</div>
                        </div>
                    </div>

                    <div>

                        <div>
                            <div className="text-[#50C84F] font-bold text-lg">₹500.00</div>
                            <div className="font-thin text-sm">Balance</div>
                        </div>

                    </div>

                </div>

                <div className="flex justify-evenly items-center">
                    <div className="font-thin text-sm">Wallet </div>
                    <div className="font-bold text-lg">1234567890</div>
                </div>

                <div className="flex justify-center mt-6 mx-auto">
                    <div className="border border-2px border-solid border-black rounded-lg w-11/12 p-4 bg-white">
                        <div className="text-center text-xl font-semibold text-black">
                            Transaction History
                        </div>

                        <div className="text-center items-center justify-center border-y-2 border-solid rounded-lg p-2 mt-2 text-black">
                            dummy Data
                        </div>
                        <div className="text-center items-center justify-center border-y-2 border-solid rounded-lg p-2 mt-2 text-black">
                            dummy Data
                        </div>
                        <div className="text-center items-center justify-center border-y-2 border-solid rounded-lg p-2 mt-2 text-black">
                            dummy Data
                        </div>
                        <div className="text-center items-center justify-center border-y-2 border-solid rounded-lg p-2 mt-2 text-black">
                            dummy Data
                        </div>
                        <div className="text-center items-center justify-center border-y-2 border-solid rounded-lg p-2 mt-2 text-black">
                            dummy Data
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center space-x-2 mt-6 ">
                    <button
                        type="button"
                        className="fixed bottom-0 w-1/2 py-3 px-3 mb-3 bg-[#9A6AFF] text-white font-semibold rounded-md hover:bg-[#4CAF50] focus:outline-none"
                    >
                        Add Balance
                    </button>
                </div>
            </div>

        </div>
    )
}

export default PayPg