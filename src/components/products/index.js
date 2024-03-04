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
            (product.Product_Label === 'Best Seller') && <a className="w-full max-w-sm bg-white border border-gray-10 rounded-lg shadow font-montserrat relative" key={index} href="#" onClick={(e) => {
              e.preventDefault();
              productNavigate(product.Product_Name);
            }}>
              <span className="py-1.5 px-2 rounded-full bg-primary text-white font-semibold text-xs inline-block absolute top-2 right-2">{ product.Product_Label }</span>
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
        </div>
      </div>
    </div>
  );
}
