import React from "react";

export default function Cart() {
  return (
    <div className="bg-white">
      <div className="bg-[#0351aa] py-5">
        <div className="mx-auto text-center max-w-2xl px-4 flex justify-between items-center sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl text-center font-medium tracking-tight text-white">
            Shopping Cart
          </h2>
          <button className="inline-block rounded-full text-[#0351aa] px-10 py-2 bg-white shadow-sm">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
