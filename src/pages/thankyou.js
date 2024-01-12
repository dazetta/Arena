import React, { useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Thankyou() {
  const order = JSON.parse(sessionStorage.getItem("order"));
  const { auth } = useContext(AuthContext);
/*
  useEffect(() => {
    var dataLayer = {
      "page_name" : "orderSuccess",
      "page_type" : "OrderSuccess",
      "page_section": "Order",
      "login_status": auth.loggedIn_status,
      "currency": "usd",
      "channel": "web",
      "order_id": String(order?.order_id).split(','),
      "total_items": order?.products.length,
      "total_quantity": order?.products.length,
      "product_id": order?.products.map(order => order.Product_Id),
      "product_name": order?.products.map(order => order.Product_Name),
      "product_price": order?.products.map(order => order.Product_Price)
    }
    auth.user_id && (dataLayer["customer_id"] = auth.user_id);
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
        "loginStatus":auth.loggedIn_status
    },
    "product": [
      {
          "productName": order?.products.map(order => order.Product_Name),
          "productId": order?.products.map(order => order.Product_Id),
          "productPrice": order?.products.map(order => order.Product_Price),
          "totalItems": order?.products.length
      }
  ],
    "page": {
        "pageName": "orderSuccess",
        "pageType": "OrderSuccess",
        "viewName": "thankyou"
    },
    "productordered": {
      "productName": order?.products.map(order => order.Product_Name)[0],
      "orderedproductId": order?.products.map(order => order.Product_Id)[0],
      "productPrice": order?.products.map(order => order.Product_Price)[0],
      "custId": auth.user_id,
      "totalItems": order?.products.length
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
            "viewName": "thankyou"
          }
        }
      }
    })
  }
*/
  return (
    <div className="bg-white py-20">
      <div className="mx-auto text-center max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-3 gap-4 py-10">
          <div className="col-span-2 gap-4 border p-5">
            <p className="text-lg text-left font-bold text-gray-900 mb-3"> Order Id: {order?.order_id} </p>
            { order?.products.map((cartItem) => {
              return <div className="col-span-2 flex gap-4 border p-5">
                <div className="aspect-w-1 aspect-h-1 w-72 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-60">
                  <img
                    src={cartItem.Product_Thumbnail_Image}
                    alt={""}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium text-gray-900">
                      {cartItem.Product_Name}
                    </p>
                    <p className="text-xl font-medium text-gray-900">
                      ${cartItem.Product_Price}
                    </p>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-sm text-gray-900 font-bold text-left">
                      Size: 12
                    </h4>
                  </div>
                </div>
              </div>;
            }) }
          </div>
          <div className="bg-[#0351aa] py-28">
            <h2 className="text-5xl text-center font-medium tracking-tight text-white">
              Thank You!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
