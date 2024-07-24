import React, { useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { AppDataContext } from "../Context/AppDataContext";

export default function Thankyou() {
  const order = JSON.parse(sessionStorage.getItem("order"));
  const { auth } = useContext(AuthContext);
  const { categories } = useContext(AppDataContext);

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
            "order_id": String(order?.order_id).split(','),
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
        "order_id": String(order?.order_id),
        "totalItems": order?.products.length
      }
    });
    }, []);
  
  return (
    <div className="bg-white py-20">
      <div className="mx-auto text-center max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="font-montserrat leading-normal text-center text-secondary text-4xl font-bold mb-2">Order successful</h2>
        <p className="text-center mb-8 max-w-2xl m-auto">Thank you! for shoping with us.</p>
        <div className="gap-4 p-5 space-y-4">
          <h3 className="text-xl font-bold tracking-tight text-secondary sm:text-2xl leading-normal mb-8">Order Id: {order?.order_id}</h3>
          <div className="max-w-2xl flex flex-col space-y-6 justify-center m-auto">
            {order?.products.map((cartItem) => {
              return <div className="flex gap-4 p-5 border border-gray-10 rounded">
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={cartItem.Product_Thumbnail_Image} alt="" />
                <div className="flex flex-col p-4 items-start leading-normal text-left space-y-4">
                  <h5 className="text-xl font-semibold tracking-tight text-black">{cartItem.Product_Name}</h5>
                  <p className="text-black">Price: <span className="font-semibold">${cartItem.Product_Price}</span></p>
                </div>
              </div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
