import React, { useState } from "react";
import UpiLogo from "../assets/upiLogo.png";
import CardLogo from "../assets/cardLogo.png";

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upi, setUpi] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExDate, setCardExDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleRadioChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Payment details submitted");
  };

  const handleReset = () => {
    setPaymentMethod("");
    setUpi("");
    setCardName("");
    setCardExDate("");
    setCvv("");
  };

  return (
    <div className="bg-[#1E2029] min-h-screen flex justify-center items-center">
      <form
        id="radioForm"
        onSubmit={handleSubmit}
        className="bg-[#2E2F37] p-6 rounded-lg w-full max-w-lg"
      >
        <div className="text-center text-xl font-semibold text-white mb-6">Payment Methods</div>

        {/* UPI Option */}
        <div className="flex items-center gap-3 p-4 rounded-md mb-4 cursor-pointer hover:bg-[#444851]">
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
            <img
              src={UpiLogo}
              alt="UPI Logo"
              className="w-16 h-8"
            />
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
        <div className="flex items-center gap-3 p-4 rounded-md mb-4 cursor-pointer hover:bg-[#444851]">
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
            <img
              src={CardLogo}
              alt="Card Logo"
              className="w-8 h-8"
            />
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

        {/* Submit and Reset Buttons */}
        {paymentMethod && (
          <div className="flex justify-between space-x-2 mt-6">
            <button
              type="submit"
              className="w-1/2 py-3 bg-[#50C84F] text-white font-semibold rounded-md hover:bg-[#4CAF50] focus:outline-none"
            >
              Submit
            </button>
            <button
              type="button"
              className="w-1/2 py-3 bg-[#F44336] text-white font-semibold rounded-md hover:bg-[#D32F2F] focus:outline-none"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
