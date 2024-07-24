import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppDataContext } from "../Context/AppDataContext";
import { AuthContext } from "../Context/AuthContext";
import { convertToSlug } from "../utils";
import SecondaryButton from "../components/Buttons/SecondaryButton";

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
          "pageName": "category-"+slug,
          "pageType": "Category",
          "viewName": "Category"
      }
    });
    }, [slug]);
    


  return (
    <div className="space-y-8">
      <img
        src={selectedCategory.Category_Detail_Image}
        alt={""}
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
      <div className="mx-auto max-w-2xl pb-16 px-4 sm:pb-12 sm:px-6 lg:max-w-7xl lg:px-8 font-montserrat">
        <h2 className="font-montserrat leading-normal text-center text-secondary text-4xl font-bold mb-2">{selectedCategory.Category_Name}</h2>
        <p className="text-center mb-8 max-w-2xl m-auto">{selectedCategory?.Category_Description}</p>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {categoryProducts.map((product, index) => (
            <a className="w-full max-w-sm bg-white border border-gray-10 rounded-lg shadow relative" key={index} href="#" onClick={(e) => {
              e.preventDefault();
              productNavigate(product.Product_Name);
            }}>
              { product.Product_Label && <span className="py-1.5 px-2 rounded-full bg-primary text-white font-semibold text-xs inline-block absolute top-2 right-2">{ product.Product_Label }</span> }
              <div className="mb-4">
                <img className="rounded-t-lg" src={product.Product_Thumbnail_Image} alt="product image" />
              </div>
              <div className="px-3 pb-3 relative space-y-2">
                <h5 className="text-lg font-semibold tracking-tight text-black min-h-[60px] block">{product.Product_Name}</h5>
                <span className="text-xl font-semibold text-black block">${product.Product_Price}</span>
                <SecondaryButton className="text-sm">Buy Now</SecondaryButton>
              </div>
            </a>
          ))}
          {/* {categoryProducts.map((product, index) => (
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
          ))} */}
        </div>
      </div>
    </div>
  );
}
