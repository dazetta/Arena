import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import navigation from "../../data/navigation";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../Context/AuthContext";
import { removeCookie } from "../../utils";

export default function Header() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-sm sticky top-0 z-50 header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
        <div className="flex items-center justify-between md:justify-start">
          <button
            type="button"
            className="md:hidden w-10 h-10 rounded-lg -ml-2 flex justify-center items-center"
          >
            <svg
              className="text-gray-500 w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <span
            className="font-bold text-[#0351aa] text-2xl cursor-pointer"
            onClick={() => navigate('/')}
          >
            DaZetta - Arena
          </span>

          <div className="hidden md:flex space-x-3 flex-1 lg:ml-8">
            {navigation.map((item, index) => (
              <a
                key={index}
                href={item.Nav_Link}
                className="px-2 py-2 rounded-lg text-black hover:text-[#0351aa] menu-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.Nav_Link);
                }}
              >
                {item.Nav_Text}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {auth.user_id ? <>
              <span className="mt-4 text-center text-[#0351aa] font-semibold underline cursor-pointer" onClick={() => navigate('/my-account')}>
                Account
              </span>
              <span className="mt-4 text-center text-[#0351aa] font-semibold underline cursor-pointer" onClick={() => { 
                removeCookie('user');
                setAuth({
                  user_name: '',
                  user_id: '',
                  loggedIn_status: 'Logged-Out'
                })
                navigate('/')
              }}>
                Logout
              </span>
            </> : <>
            <span className="mt-4 text-center text-[#0351aa] font-semibold underline cursor-pointer" onClick={() => navigate('/auth/register')}>
              Register
            </span>
            <span className="mt-4 text-center text-[#0351aa] font-semibold underline cursor-pointer" onClick={() => navigate('/login')}>
              Login
            </span>
            </>
            }
            <ShoppingCartIcon className="mt-4 text-[#0351aa] h-6 w-6 cursor-pointer" onClick={() => navigate('/cart')} />
          </div>
        </div>
      </div>
    </div>
  );
}
