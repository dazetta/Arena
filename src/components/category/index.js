import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { convertToSlug } from "../../utils";
import { AppDataContext } from "../../Context/AppDataContext";

export default function Categories() {
  const navigate = useNavigate();
  const { categories } = useContext(AppDataContext);

  console.log(categories, '.catj')

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-12 lg:max-w-none lg:py-18">
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative cursor-pointer"
                onClick={() => navigate(`category/${convertToSlug(category.Category_Name)}`)}
              >
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    src={category.Category_Thumbnail_Image}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 text-center text-sm text-[#0351aa] font-semibold underline cursor-pointer">
                  {category.Category_Name}
                </h3>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
