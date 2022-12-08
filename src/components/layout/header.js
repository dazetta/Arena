import React from "react";
import { useNavigate } from "react-router-dom";
import navigation from "../../data/navigation";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const navigate = useNavigate();
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

          <span
            class="font-bold text-[#0351aa] text-2xl cursor-pointer"
            onClick={() => navigate('/')}
          >
            DaZetta - Arena
          </span>

          <div class="hidden md:flex space-x-3 flex-1 lg:ml-8">
            {navigation.map((e) => (
              <a
                href={e.Nav_Link}
                class="px-2 py-2 rounded-lg text-black hover:text-[#0351aa]"
              >
                {e.Nav_Text}
              </a>
            ))}
          </div>

          <div class="flex items-center space-x-4">
            <span className="mt-4 text-center text-[#0351aa] font-semibold underline cursor-pointer" onClick={() => navigate('/login')}>
              Login
            </span>
            <ShoppingCartIcon className="mt-4 text-[#0351aa] h-6 w-6 cursor-pointer" onClick={() => navigate('/cart')} />
          </div>
        </div>
      </div>
    </div>
  );
}
