import React, { useState } from "react";
import UpiLogo from "../assets/upiLogo.png";
import CardLogo from "../assets/cardLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState(0);
  const [upi, setUpi] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExDate, setCardExDate] = useState("");
  const [cvv, setCvv] = useState("");

  const navigate = useNavigate();

  const handleRadioChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const token = localStorage.getItem("token");
    const cleanToken = token.replace(/"/g, "");
    console.log(cleanToken);

    await axios
      .post(
        "https://caber-77w9.onrender.com/api/user/addMoney",
        { amount: amount }, // Request body
        {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error.response?.data || error.message);
      });

    alert("Money Added Successfully");
  };

  const handleReset = () => {
    setPaymentMethod("");
    setAmount("");
    setUpi("");
    setCardName("");
    setCardExDate("");
    setCvv("");
  };

  return (
    <div className="h-screen items-center ">

      <form
        id="radioForm"
        onSubmit={handleSubmit}
        className="bg-[#1E2029] p-6 h-full items-center"
      >
        <div onClick={() => navigate("/user-paypg")} className="">
          <i class="ri-arrow-left-line text-white text-2xl"></i>
        </div>

        <div className="text-center text-xl font-semibold text-white mb-10 mt-4">
          Payment Methods
        </div>


        <div className="flex justify-center items-center gap-3 rounded-md mb-6 cursor-pointer hover:bg-[#444851]">
          <input
            type="number"
            placeholder="Enter Amount"
            className="w-full px-4 py-4 rounded-md text-green-500 text-lg focus:outline-none placeholder:text-black focus:ring-2 focus:ring-indigo-500 bg-white"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex flex-col justify-between relative">
          <div>
            {/* UPI Option */}
            <div className="flex items-center gap-3 rounded-md mb-6 cursor-pointer hover:bg-[#444851]">
              <input
                type="radio"
                id="UPI1"
                name="paymentMethod"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={handleRadioChange}
                className="hidden"
              />
              <label
                htmlFor="UPI1"
                className="flex items-center gap-2 w-full p-3 bg-[#ffffff] rounded-md"
              >
                <img src={UpiLogo} alt="UPI Logo" className="w-16 h-8" />
                <span className="text-black text-lg">UPI</span>
              </label>
            </div>

            {paymentMethod === "UPI" && (
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Enter your UPI ID"
                  value={upi}
                  onChange={(e) => setUpi(e.target.value)}
                  required
                  pattern="^[a-zA-Z0-9._-]{2,256}@[a-zA-Z0-9.-]{2,64}$"
                  className="w-full px-4 py-2 bg-[#444851] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            {/* Card Option */}
            <div className="flex items-center gap-3 rounded-md mb-4 cursor-pointer hover:bg-[#444851]">
              <input
                type="radio"
                id="CARD1"
                name="paymentMethod"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={handleRadioChange}
                className="hidden"
              />
              <label
                htmlFor="CARD1"
                className="flex items-center gap-2 w-full p-3 bg-[#ffffff] rounded-md"
              >
                <img src={CardLogo} alt="Card Logo" className="w-8 h-8" />
                <span className="text-black text-lg">Credit/Debit Card</span>
              </label>
            </div>

            {paymentMethod === "Card" && (
              <div className="mb-6 space-y-4">
                <input
                  type="text"
                  placeholder="Enter name on card"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                  pattern="[a-zA-Z]{2,32}"
                  className="w-full px-4 py-2 bg-[#444851] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Expiry Date (MM/DD)"
                  value={cardExDate}
                  onChange={(e) => setCardExDate(e.target.value)}
                  required
                  pattern="0[0-9]|1[1-9]\/[0-9]{2}"
                  className="w-full px-4 py-2 bg-[#444851] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="password"
                  placeholder="Enter CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                  pattern="\d{3,4}"
                  maxLength="4"
                  className="w-full px-4 py-2 bg-[#444851] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
          </div>

          <div className="bottom-0 mt-20 fixed justify-center w-80 pl-2 mb-6">
            {/* Submit and Reset Buttons */}
            {paymentMethod && (
              <div className="flex flex-col justify-between mt-6 gap-4 w-full">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#50C84F] text-white font-semibold rounded-md hover:bg-[#4CAF50] focus:outline-none "
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="w-full py-3 bg-[#F44336] text-white font-semibold rounded-md hover:bg-[#D32F2F] focus:outline-none"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
