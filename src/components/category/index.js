import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { convertToSlug } from "../../utils";
import { AppDataContext } from "../../Context/AppDataContext";

export default function Categories() {
  const navigate = useNavigate();
  const { categories } = useContext(AppDataContext);

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-12 lg:max-w-none lg:py-18 home-categories">
          <h2 className="font-montserrat leading-normal text-center text-secondary text-4xl font-bold">Categories</h2>
          <div className="mt-6 space-y-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:space-y-0">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative cursor-pointer font-montserrat"
                onClick={() => navigate(`category/${convertToSlug(category.Category_Name)}`)}
              >
                <div className="relative h-60 w-full overflow-hidden rounded-lg bg-white sm:aspect-w-2 sm:aspect-h-1 sm:h-48 lg:h-80 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    src={category.Category_Thumbnail_Image}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="absolute w-full h-full bottom-0 inset-x-0 text-white text-2xl text-center leading-4 bg-overlay rounded flex justify-center items-center">
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
