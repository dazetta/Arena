import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "../config";
import { AuthContext } from "../Context/AuthContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  const [input, setInput] = useState({
    name: "",
    email: auth.user_id,
    card: "",
    cvv: "",
  });
  
  const url = CONFIG.BASE_URL + CONFIG.CREATE_ORDER;

  const handleCheckout = () => {
    var order_id = new Date().getTime()
    const payload = {
      order_id: order_id,
      user_id: input.email,
      products: cartItems?.map(item => {
        return {
          prod_id: item.Product_Id,
          prod_price: item.Product_Price
        }
      }),
    };
    
    if(!auth.user_id) {
      payload.password = input.password;
      payload.user_name = input.name;
      payload.user_email = input.email;
    }

    sessionStorage.setItem("order", JSON.stringify({ ...payload, products: cartItems }));
    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      mode: "no-cors",
      redirect: "follow",
    }).then((res) => {
      localStorage.removeItem("cart")
      navigate("/thank-you")
    });
  };

  const inputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    var dataLayer = {
      "page_name" : "checkout",
      "page_type" : "Checkout",
      "page_section": "Checkout",
      "login_status": auth.loggedIn_status,
      "currency": "usd",
      "channel": "web",
      "payment_method": "Credit Card"
    }
    auth.user_id && (dataLayer["customer_id"] = auth.user_id);
    if(cartItems?.length > 0) {
      dataLayer["product_id"] = cartItems?.map(item => item.Product_Id);
      dataLayer["product_name"] = cartItems?.map(item => item.Product_Name);
      dataLayer["product_price"] = cartItems?.map(item => item.Product_Price);
      dataLayer["product_category"] = cartItems?.map(item => item.Category_Id);
      dataLayer["total_items"] = cartItems?.length;
      dataLayer["total_quantity"] = cartItems?.length;
    }
  }, []);

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
                {...(auth.user_id && { value:auth.user_name, disabled: true })}
                onChange={inputHandler}
              />
            </div>
            <div className="flex flex-col items-start mt-6">
              <label className=" font-semibold">Your Email</label>
              <input
                className="border border-gray-400 mt-2 w-full p-2"
                name="email"
                type="email"
                {...(auth.user_id && { value:auth.user_id, disabled: true })}
                onChange={inputHandler}
              />
            </div>
            {
              !auth.user_id && <div className="flex flex-col items-start mt-6">
              <label className=" font-semibold">Your Password</label>
              <input
                className="border border-gray-400 mt-2 w-full p-2"
                name="password"
                type="password"
                onChange={inputHandler}
              />
            </div>
            }
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
                {...(auth.user_id && { value:'**** **** **** ****', disabled: true })}
                onChange={inputHandler}
              />
            </div>
            <div className="flex flex-col items-start mt-6">
              <label className=" font-semibold">CVV</label>
              <input
                className="border border-gray-400 mt-2 w-full p-2"
                name="cvv"
                {...(auth.user_id && { value:'***', disabled: true })}
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
