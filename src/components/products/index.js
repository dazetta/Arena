import { useNavigate } from "react-router-dom";
import { convertToSlug } from "../../utils";
import { useContext } from "react";
import { AppDataContext } from "../../Context/AppDataContext";

export default function Products() {
  const navigate = useNavigate();
  const productNavigate = (name) => {
    return navigate(`product/${convertToSlug(name)}`);
  };
  const { products } = useContext(AppDataContext);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl text-center font-bold tracking-tight text-[#0351aa]">
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
              <h3 className="mt-4 text-center text-sm text-[#0351aa] font-semibold underline" onClick={() => productNavigate(product.Product_Name)}>
                View
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
