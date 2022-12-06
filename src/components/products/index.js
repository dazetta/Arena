import { useNavigate } from "react-router-dom";
import products from "../../data/products";
import { convertToSlug } from "../../utils";

export default function Products() {
  const navigate = useNavigate();
  const productNavigate = (name) => {
    return navigate( `product/${convertToSlug(name)}`)
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product, index) => (
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
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.productName}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.Product_Price}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.Product_Description}
                </p>
              </div>
              <button
                className="mt-5 inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                onClick={() => productNavigate(product.Product_Name)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
