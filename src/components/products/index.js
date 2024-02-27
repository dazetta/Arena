import { useNavigate } from "react-router-dom";
import { convertToSlug } from "../../utils";
import { useContext } from "react";
import { AppDataContext } from "../../Context/AppDataContext";
import SecondaryButton from "../Buttons/SecondaryButton";

export default function Products() {
  const navigate = useNavigate();
  const productNavigate = (name) => {
    return navigate(`product/${convertToSlug(name)}`);
  };
  const { products } = useContext(AppDataContext);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="font-montserrat leading-normal text-center text-secondary text-4xl font-bold">Best Sellers</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 home-best-sellers">
          {products.map((product, index) => (
            (product.Product_Label == 'best_seller') && <a class="w-full max-w-sm bg-white border border-gray-10 rounded-lg shadow font-montserrat relative" href="#" onClick={(e) => {
              e.preventDefault();
              productNavigate(product.Product_Name);
            }}>
              <span class="py-1.5 px-2 rounded-full bg-primary text-white font-semibold text-xs inline-block absolute top-2 right-2">Best Seller</span>
              <div className="mb-4">
                <img class="rounded-t-lg" src={product.Product_Thumbnail_Image} alt="product image" />
              </div>
              <div class="px-3 pb-3 relative space-y-2">
                <h5 class="text-lg font-semibold tracking-tight text-black min-h-[60px] block">{product.Product_Name}</h5>
                <span class="text-xl font-semibold text-black block">${product.Product_Price}</span>
                <SecondaryButton className="text-sm">Buy Now</SecondaryButton>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
