import React from "react";
import { useNavigate } from "react-router-dom";
import { GiftIcon } from "@heroicons/react/24/solid";
import { convertToSlug } from "../utils";

export default function MyOrders() {
  const navigate = useNavigate();
  const cartItem = JSON.parse(localStorage.getItem("cart"));
  const order = JSON.parse(localStorage.getItem("order"));

  const productNavigate = (name) => {
    return navigate(`/product/${convertToSlug(name)}`);
  };

  return (
    <div className="bg-white">
      <div className="bg-[#0351aa] py-5">
        <div className="mx-auto text-center max-w-2xl px-4 flex justify-between items-center sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl text-center font-medium tracking-tight text-white">
            My Orders
          </h2>
        </div>
      </div>
      <div className="mx-auto text-center max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="grid grid-cols-1 gap-4 py-10">
          <div class="flex gap-4 border p-5">
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
                <p
                  className="text-lg font-medium text-[#0351aa]"
                  onClick={() => productNavigate(cartItem.Product_Name)}
                >
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
        </div>
      </div>
    </div>
  );
}
