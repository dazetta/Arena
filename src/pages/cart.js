import React from "react";
import { GiftIcon } from "@heroicons/react/24/solid";

export default function Cart() {
  const cartItem = JSON.parse(localStorage.getItem("cart"));

  return (
    <div className="bg-white">
      <div className="bg-[#0351aa] py-5">
        <div className="mx-auto text-center max-w-2xl px-4 flex justify-between items-center sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl text-center font-medium tracking-tight text-white">
            Your Shopping Cart
          </h2>
          <button className="inline-block rounded-full text-[#0351aa] px-10 py-2 bg-white shadow-sm">
            Checkout
          </button>
        </div>
      </div>
      <div className="mx-auto text-center max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="grid grid-cols-3 gap-4 py-10">
          <div class="col-span-2 flex gap-4 border p-5">
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
          </div>
          <div class="border p-5">
            <h3 className="text-xl text-gray-900 font-bold text-left">
              Order Now
            </h3>
            <div className="flex gap-2 mt-5">
              <GiftIcon className="text-[#0351aa] w-6 h-6" />
              <p className="text-md text-gray-900 text-left">
                Do you have a gift voucher or promotional code?
              </p>
            </div>
            <div className="flex flex-col items-start mt-6">
              <label className=" font-semibold">Code</label>
              <input className="border border-gray-400 mt-2 w-full p-2" />
              <button className="text-[#0351aa] border-2 px-3 py-2 mt-4 border-[#0351aa]">Confirm Code</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
