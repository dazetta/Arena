import React from "react";

export default function Header() {
  return (
    <div class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
        <div class="flex items-center justify-between md:justify-start">
          <button
            type="button"
            class="md:hidden w-10 h-10 rounded-lg -ml-2 flex justify-center items-center"
          >
            <svg
              class="text-gray-500 w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <a href="#" class="font-bold text-[#0351aa] text-2xl">
            DaZetta - Arena
          </a>

          <div class="hidden md:flex space-x-3 flex-1 lg:ml-8">
            <a
              href="#"
              class="px-2 py-2 rounded-lg text-black hover:text-[#0351aa]"
            >
              Brands
            </a>
            <a
              href="#"
              class="px-2 py-2 rounded-lg text-black hover:text-[#0351aa]"
            >
              Men's
            </a>
            <a
              href="#"
              class="px-2 py-2 rounded-lg text-black hover:text-[#0351aa]"
            >
              Women's
            </a>
            <a
              href="#"
              class="px-2 py-2 rounded-lg text-black hover:text-[#0351aa]"
            >
              Shoes
            </a>
            <a
              href="#"
              class="px-2 py-2 rounded-lg text-black hover:text-[#0351aa]"
            >
              Clothing
            </a>
          </div>

          <div class="flex items-center space-x-4"></div>
        </div>
      </div>
    </div>
  );
}
