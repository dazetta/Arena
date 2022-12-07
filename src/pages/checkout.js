import React from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const cartItem = JSON.parse(localStorage.getItem("cart"));

  const url =
    "https://script.google.com/macros/s/AKfycbwCWCScUL7hm20c1w0E3v5-FO6YvLZziBjD8moj9awvxl7fK2x7No-ckbUMeo5xD4Cu/exec?action=post&type=order";

  const handleCheckout = () => {
    navigate("/thank-you");

    //   {
    //     "order_id":"sknn",
    //     "user_id": "b",
    //     "product_id": 1,
    //     "product_price": 300
    // }
  };

  return (
    <div className="bg-white pb-32">
      <div className="bg-[#0351aa] py-5">
        <div className="mx-auto text-center max-w-2xl px-4 flex justify-between items-center sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl text-center font-medium tracking-tight text-white">
            Checkout
          </h2>
        </div>
      </div>
      <div className="mx-auto text-center max-w-2xl px-4 sm:px-6 lg:max-w-4xl lg:px-8">
        <div class="grid grid-cols-2 gap-4 py-10">
          <div class="border px-5 py-10">
            <h3 className="text-xl text-gray-900 font-bold text-left">
              Your Details
            </h3>
            <div className="flex flex-col items-start mt-6">
              <label className=" font-semibold">Your Name</label>
              <input className="border border-gray-400 mt-2 w-full p-2" />
            </div>
            <div className="flex flex-col items-start mt-6">
              <label className=" font-semibold">Your Email</label>
              <input className="border border-gray-400 mt-2 w-full p-2" />
            </div>
          </div>
          <div class="border px-5 py-10">
            <h3 className="text-xl text-gray-900 font-bold text-left">
              Payment Details
            </h3>

            <div className="flex flex-col items-start mt-6">
              <label className=" font-semibold">Card Number</label>
              <input className="border border-gray-400 mt-2 w-full p-2" />
            </div>
            <div className="flex flex-col items-start mt-6">
              <label className=" font-semibold">CVV</label>
              <input className="border border-gray-400 mt-2 w-full p-2" />
            </div>
          </div>
        </div>
        <div>
          <button
            className="inline-block mt-5 rounded-full bg-[#0351aa] px-10 py-2 text-white shadow-sm w-60"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
