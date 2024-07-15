import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { AppDataContext } from "../Context/AppDataContext";
import SecondaryButton from "../components/Buttons/SecondaryButton";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { FaGift } from "react-icons/fa";

export default function Cart() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { cartItems, setCartItems } = useContext(AppDataContext);

  const totalPrice = cartItems?.map((item) => item.Product_Price).reduce(function (a, b) { return a + b; }, 0);

  const removeCartItem = (id) => {
    const newCartItems = cartItems.filter((item) => item.Product_Id !== id);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    setCartItems(newCartItems);
  }
/*
  useEffect(() => {
    var dataLayer = {
      "page_name": "cart",
      "page_type": "Cart",
      "page_section": "Checkout",
      "login_status": auth.loggedIn_status,
      "currency": "usd",
      "channel": "web",
    }
    auth.user_id && (dataLayer["customer_id"] = auth.user_id);
    if (cartItems?.length > 0) {
      dataLayer["product_id"] = cartItems?.map(item => item.Product_Id);
      dataLayer["product_name"] = cartItems?.map(item => item.Product_Name);
      dataLayer["product_price"] = cartItems?.map(item => item.Product_Price);
      dataLayer["total_items"] = cartItems?.length;
      dataLayer["total_quantity"] = cartItems?.length;
    }
    setCartItems(() => {
      return JSON.parse(localStorage.getItem("cart")) || [];
    });
  }, []);
*/

useEffect(() => {
window.adobeDataLayer.push({
  "event": "landed",
  "eventInfo": {
      "eventName": "landed"
  },
  "custData": {
    "custId": auth.user_id,
    "loginStatus": auth.loggedIn_status
  },
  "page": {
      "pageName": "cart",
      "pageType": "Cart",
      "viewName": "cart"
  },
  "product":  {
          "productName": cartItems?.map(item => item.Product_Name),
          "productId": cartItems?.map(item => item.Product_Id),
          "productPrice": cartItems?.map(item => item.Product_Price),
          "totalItems": cartItems?.length
      },
  "orderSummary": {
      "totalProductPrice": cartItems?.map((item) => item.Product_Price).reduce(function (a, b) {return a + b;}, 0),
      "totalOrderPrice": cartItems?.map((item) => item.Product_Price).reduce(function (a, b) {return a + b;}, 0)
  }
});
}, []);
  /*
  if(window.alloy){
    window.alloy("sendEvent", {
      "renderDecisions": true,
      decisionScopes: ["__view__"],
      "xdm": {
        "web": {
          "webPageDetails": {
            "viewName": "cart"
          }
        }
      }
    })
  }
*/
  return (
    <div className="mx-auto max-w-2xl pb-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8 font-montserrat">
      <h2 className="font-montserrat leading-normal text-center text-secondary text-4xl font-bold mb-2">Checkout</h2>
      <div className="mx-auto text-center max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {cartItems?.length > 0 ? <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
          <div className="border border-gray-10 rounded space-y-4 p-5">
            {cartItems.map((cartItem) => {
              return <div className="flex gap-4 p-5 border border-gray-10 rounded">
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={cartItem.Product_Thumbnail_Image} alt="" />
                <div className="flex flex-col p-4 items-start leading-normal text-left space-y-4">
                  <h5 className="text-xl font-semibold tracking-tight text-black">{cartItem.Product_Name}</h5>
                  <p className="text-black">Price: <span className="font-semibold">${cartItem.Product_Price}</span></p>
                  <SecondaryButton onClick={() => removeCartItem(cartItem.Product_Id)}>Remove</SecondaryButton>
                </div>
              </div>;
            })}
          </div>
          <div className="border border-gray-10 rounded p-5 space-y-4">
            <h2 className="font-montserrat leading-normal text-secondary text-2xl font-semibold text-left">Order Now</h2>
            <div className="flex gap-2 items-center">
              <FaGift />
              <p className="text-md text-black text-left">
                Do you have a gift voucher or promotional code?
              </p>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <label className="font-montserrat leading-normal text-secondary text-left">Voucher Code: </label>
              <input className="bg-gray-50 border border-gray-10 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none" placeholder="Voucher Code" />
              <SecondaryButton>Confirm Code</SecondaryButton>
            </div>
            <div className="font-montserrat">
              <div className="flex items-end justify-between">
                <span>Sub Total</span>
                <span className="font-semibold">${totalPrice}</span>
              </div>
              <div className="flex items-end justify-between mt-3">
                <span>Delivery</span>
                <span className="text-success font-semibold">Free</span>
              </div>
              <hr className="my-5" />
              <div className="flex items-end justify-between mt-3">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${totalPrice}</span>
              </div>
              <PrimaryButton className="w-full mt-4" onClick={() => navigate('/checkout')}>Checkout</PrimaryButton>
            </div>
          </div>
        </div> : <div className="mt-6 p-6"><h1 className="text-3xl text-gray-900 font-semibold text-center">Oops! Your cart is empty</h1></div>}

      </div>
    </div>
  );
}
