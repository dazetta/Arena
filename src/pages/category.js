import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppDataContext } from "../Context/AppDataContext";
import { AuthContext } from "../Context/AuthContext";
import { convertToSlug } from "../utils";

export default function Category() {
  let { slug } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { products } = useContext(AppDataContext);
  const { categories } = useContext(AppDataContext);

  const productNavigate = (name) => {
    return navigate(`/product/${convertToSlug(name)}`);
  };

  const selectedCategory = categories?.filter(
    (e) => convertToSlug(e.Category_Name) === slug
  )?.[0];

  const categoryProducts = products.filter(
    (e) => e.Category_Id === selectedCategory?.Category_Id
  );
/*
  useEffect(() => {
    var dataLayer = {
      "page_name" : "category-"+slug,
      "page_type" : "Category",
      "page_section": slug,
      "login_status": auth.loggedIn_status,
      "currency": "usd",
      "channel": "web",
      "product_category": slug
    }
    auth.user_id && (dataLayer["customer_id"] = auth.user_id);
  }, [slug]);
*/
    useEffect(() => {
      window.adobeDataLayer.push({
        "event": "landed",
        "eventInfo": {
            "eventName": "landed"
        },
        "custData": {
          "login_status": auth.loggedIn_status
        },
        "page": {
            "pageName": "category-"+slug,
            "pageType": "Category", 
            "page_section": slug,
            "currency": "usd",
            "channel": "web",
            "product_category": slug,
            "viewName": "category"
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
            "viewName": "category"
          }
        }
      }
    })
  }
*/
  return (
    <div className="bg-white">
      <img
        src={selectedCategory.Category_Detail_Image}
        alt={""}
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
      <div className="bg-[#0351aa] py-5">
        <h2 className="text-2xl text-center font-bold tracking-tight text-white">
          {selectedCategory.Category_Name}
        </h2>
      </div>
      <div className="mx-auto text-center max-w-2xl px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <p>{selectedCategory?.Category_Description}</p>
      </div>
      <div className="mx-auto max-w-2xl pb-16 px-4 sm:pb-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {categoryProducts.map((product, index) => (
            <div key={index}>
              <div
                key={index}
                className="group relative"
                onClick={() => productNavigate(product.Product_Name)}
              >
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={product.Product_Thumbnail_Image}
                    alt={""}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.Product_Name}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${product.Product_Price}
                  </p>
                </div>
              </div>
              <h3
                className="mt-4 text-center text-sm text-[#0351aa] font-semibold underline"
                onClick={() => productNavigate(product.Product_Name)}
              >
                View
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
