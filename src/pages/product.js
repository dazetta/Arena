import React from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/solid";

import products from "../data/products";
import { convertToSlug } from "../utils";

export default function Product() {
  let { slug } = useParams();

  const selectedProduct = products?.filter(
    (e) => convertToSlug(e.Product_Name) === slug
  )?.[0];

  return (
    <div>
      <div className="bg-white">
        <div className="bg-[#0351aa] py-5">
          <h2 className="text-2xl text-center font-bold tracking-tight text-white">
            {selectedProduct.Product_Name}
          </h2>
        </div>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
              <img
                src={selectedProduct.Product_Detail_Image}
                alt={""}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div>
              <h1 className="text-lg font-medium text-gray-900">
                {selectedProduct.Product_Name}
              </h1>
              <p className="text-2xl font-medium text-gray-900">
                ${selectedProduct.Product_Price}
              </p>
              <div className="mt-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((e, i) => (
                  <StarIcon className="text-[#0351aa] w-5 h-5" />
                ))}
              </div>
              <div className="mt-5">
                <h4 className="text-sm text-gray-900 font-bold">Size:</h4>
                <select className="py-2 px-4 border mt-2 border-gray-900">
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                  <option>15</option>
                </select>
              </div>
              <div className="mt-4">{selectedProduct.Product_Description}</div>
              <div className="mt-4">
                <button className="flex items-center gap-3 rounded-full bg-[#0351aa] px-10 py-2 text-white shadow-sm">
                  Add to Cart
                  <ShoppingCartIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
