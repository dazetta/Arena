import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "../config";
import { AuthContext } from "../Context/AuthContext";
import { AppDataContext } from "../Context/AppDataContext";
import PrimaryButton from "../components/Buttons/PrimaryButton";

export default function Checkout() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { setCartItems } = useContext(AppDataContext);
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  const [input, setInput] = useState({
    name: "",
    email: auth.user_id,
    card: "",
    cvv: "",
  });
  const [disableCheckout, setDisableCheckout] = useState(true);

  const validateInputFields = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (let key in input) {
      if((key === 'email' && !emailPattern.test(input[key])) || input[key].length < 3) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    if(auth.user_id) {
      setInput({
        name: auth.user_name,
        email: auth.user_id,
        card: "**** **** **** ****",
        cvv: "***",
      });
    }
  }, []);

  useEffect(() => {
    if(validateInputFields()) {
      setDisableCheckout(false);
    } else {
      setDisableCheckout(true);
    }
  }, [input]);
  
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
      localStorage.removeItem("cart");
      setCartItems([]);
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
    <div className="mx-auto max-w-2xl pb-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8 font-montserrat">
      <h2 className="font-montserrat leading-normal text-center text-secondary text-4xl font-bold mb-2">Checkout</h2>
      <div className="mx-auto text-center max-w-2xl px-4 sm:px-6 lg:max-w-4xl lg:px-8">
        <div className="grid grid-cols-2 gap-4 py-10">
          <div className="border border-gray-10 rounded px-5 py-10">
            <h3 className="text-xl text-secondary font-bold text-left">
              Your Details
            </h3>
            <div className="flex flex-col items-start mt-6">
              <label className="font-semibold mb-2">Your Name</label>
              <input
                className="bg-gray-50 border border-gray-10 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                name="name"
                {...(auth.user_id && { value:auth.user_name, disabled: true })}
                onChange={inputHandler}
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col items-start mt-6">
              <label className="font-semibold mb-2">Your Email</label>
              <input
                className="bg-gray-50 border border-gray-10 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                name="email"
                type="email"
                {...(auth.user_id && { value:auth.user_id, disabled: true })}
                onChange={inputHandler}
                placeholder="Enter your email"
              />
            </div>
            {
              !auth.user_id && <div className="flex flex-col items-start mt-6">
              <label className="font-semibold mb-2">Your Password</label>
              <input
                className="bg-gray-50 border border-gray-10 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                name="password"
                type="password"
                onChange={inputHandler}
                placeholder="Enter your password"
              />
            </div>
            }
          </div>
          <div className="border border-gray-10 rounded px-5 py-10">
            <h3 className="text-xl text-secondary font-bold text-left">
              Payment Details
            </h3>
            <div className="flex flex-col items-start mt-6">
              <label className="font-semibold mb-2">Card Number</label>
              <input
                className="bg-gray-50 border border-gray-10 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                name="card"
                {...(auth.user_id && { value:'**** **** **** ****', disabled: true })}
                onChange={inputHandler}
                placeholder="Enter your card number"
              />
            </div>
            <div className="flex flex-col items-start mt-6">
              <label className="font-semibold mb-2">CVV</label>
              <input
                className="bg-gray-50 border border-gray-10 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                name="cvv"
                {...(auth.user_id && { value:'***', disabled: true })}
                onChange={inputHandler}
                placeholder="Enter your CVV"
              />
            </div>
          </div>
        </div>
        <PrimaryButton className={`text-lg`} onClick={handleCheckout} disabled={disableCheckout}>Checkout</PrimaryButton>
      </div>
    </div>
  );
}
