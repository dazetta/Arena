import React, { useEffect } from "react";

export default function Thankyou() {
  const cartItem = JSON.parse(localStorage.getItem("cart"));
  const order = JSON.parse(localStorage.getItem("order"));

  useEffect(() => {
    var dataObj = {
      "page_name" : "Thank You",
      "page_type" : "order_success",
      "site_region": "en_us",
      "site_currency": "usd",
      "order_id": order?.order_id,
      "tealium_event": "order_success_view"
    };
    if(window.utag) {
      window.utag.view(dataObj);
    }
  }, []);

  return (
    <div className="bg-white py-20">
      <div className="mx-auto text-center max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-3 gap-4 py-10">
          <div className="col-span-2 flex gap-4 border p-5">
            <div className="aspect-w-1 aspect-h-1 w-72 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-60">
              <img
                src={cartItem.Product_Thumbnail_Image}
                alt={""}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="w-full">
              <p className="text-lg text-left font-bold text-gray-900">
                Order Id: {order?.order_id}
              </p>
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
