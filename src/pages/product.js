import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../Context/AuthContext";

import { AppDataContext } from "../Context/AppDataContext";
import { convertToSlug } from "../utils";

export default function Product() {
  let { slug } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { products, categories } = useContext(AppDataContext);

  const selectedProduct = products?.filter(
    (e) => convertToSlug(e.Product_Name) === slug
  )?.[0];

  const handleAddToCart = () => {
    let existingItem = JSON.parse(localStorage.getItem('cart'));
    if(existingItem) {
      existingItem.push(selectedProduct);
      localStorage.setItem('cart', JSON.stringify(existingItem));
    } else {
      var cartItems = [];
      cartItems.push(selectedProduct);
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    navigate('/cart')
  }
/*
  useEffect(() => {
    console.log(categories.filter((category) => category.Category_Id == selectedProduct?.Category_Id)[0].Category_Name, '>>>')
    var dataLayer = {
      "page_name" : "pdp-" + selectedProduct?.Product_Name,
      "page_type" : "ProductDetails",
      "page_section": selectedProduct?.Product_Name,
      "login_status": auth.loggedIn_status,
      "currency": "usd",
      "channel": "web",
      "product_id": selectedProduct?.Product_Id.split(','),
      "product_name": selectedProduct?.Product_Name.split(','),
      "product_category": categories.filter((category) => category.Category_Id == selectedProduct?.Category_Id)[0].Category_Name,
      "product_price": String(selectedProduct?.Product_Price).split(',')
    }
    auth.user_id && (dataLayer["customer_id"] = auth.user_id);
  }, []);
*/

useEffect(() => {
  console.log(categories.filter((category) => category.Category_Id == selectedProduct?.Category_Id)[0].Category_Name, '>>>')
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
        "pageName": "pdp-" + selectedProduct?.Product_Name,
        "pageType": "ProductDetails",
        "pincodeStatus": "<deliverable/not deliverable>",
        "viewName": "product",
        "entity.id": selectedProduct?.Product_Id
    },
    "product": [
        {
            "productName": selectedProduct?.Product_Name,
            "productCategory": categories.filter((category) => category.Category_Id == selectedProduct?.Category_Id)[0].Category_Name,
            "productId": selectedProduct?.Product_Id,
            "productPrice": String(selectedProduct?.Product_Price)
        }
    ]
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
            "viewName": "product"
          }
        }
      }
    })
  }
*/
  return (
    <div className="bg-white">
      <div className="bg-[#0351aa] py-5">
        <h2 className="text-2xl text-center font-bold tracking-tight text-white">
          {selectedProduct.Product_Name}
        </h2>
      </div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none">
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
              <button className="flex items-center gap-3 rounded-full bg-[#0351aa] px-10 py-2 text-white shadow-sm atc-btn" onClick={handleAddToCart}>
                Add to Cart
                <ShoppingCartIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
