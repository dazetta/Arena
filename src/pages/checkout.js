import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "../config";

export default function Checkout() {
  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  const [input, setInput] = useState({
    name: "",
    email: "",
    card: "",
    cvv: "",
  });

  const url = CONFIG.BASE_URL + CONFIG.CREATE_ORDER;

  const handleCheckout = () => {
    var orderId = new Date().getTime()
    const payload = {
      order_id: orderId,
      user_id: input.email,
      products: cartItems.map(item => {
        return {
          prod_id: item.Product_Id,
          prod_price: item.Product_Price
        }
      }),
    };
    sessionStorage.setItem("order", JSON.stringify({ ...payload, products: cartItems }));
    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      mode: "no-cors",
      redirect: "follow",
    }).then((res) => navigate("/thank-you"));
    navigate("/thank-you");
  };

  const inputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setInput({ ...input, [name]: value });
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
        <div className="grid grid-cols-2 gap-4 py-10">
          <div className="border px-5 py-10">
            <h3 className="text-xl text-gray-900 font-bold text-left">
              Your Details
            </h3>
            <div className="flex flex-col items-start mt-6">
              <label className=" font-semibold">Your Name</label>
              <input
                className="border border-gray-400 mt-2 w-full p-2"
                name="name"
                onChange={inputHandler}
              />
            </div>
            <div className="flex flex-col items-start mt-6">
              <label className=" font-semibold">Your Email</label>
              <input
                className="border border-gray-400 mt-2 w-full p-2"
                name="email"
                type="email"
                onChange={inputHandler}
              />
            </div>
          </div>
          <div className="border px-5 py-10">
            <h3 className="text-xl text-gray-900 font-bold text-left">
              Payment Details
            </h3>

            <div className="flex flex-col items-start mt-6">
              <label className=" font-semibold">Card Number</label>
              <input
                className="border border-gray-400 mt-2 w-full p-2"
                name="card"
                onChange={inputHandler}
              />
            </div>
            <div className="flex flex-col items-start mt-6">
              <label className=" font-semibold">CVV</label>
              <input
                className="border border-gray-400 mt-2 w-full p-2"
                name="cvv"
                onChange={inputHandler}
              />
            </div>
          </div>
        </div>
        <div>
          <button
            className={`inline-block mt-5 rounded-full bg-[#0351aa] px-10 py-2 text-white opac shadow-sm w-60 ${
              input.email === "" ? "opacity-30" : ""
            }`}
            onClick={handleCheckout}
            disabled={input.email === ""}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
