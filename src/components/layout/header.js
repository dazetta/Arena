import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import navigation from "../../data/navigation";
import { FaCartShopping } from "react-icons/fa6";
import { AuthContext } from "../../Context/AuthContext";
import { removeCookie } from "../../utils";
import { Link } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from '../../assets/logo.png';
import { AppDataContext } from "../../Context/AppDataContext";

export default function Header() {
  const { auth, setAuth } = useContext(AuthContext);
  const { cartItems } = useContext(AppDataContext);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <header className="bg-white sticky top-0 z-[999] shadow">
        <nav className="mx-auto flex max-w-7xl items-center justify-between lg:justify-start px-4 py-2.5 font-montserrat">
          <div className="mr-8">
            <Link to="/" className="w-24 block">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="flex space-x-4 lg:hidden">
            <div className="relative">
              <FaCartShopping className="mt-0 text-primary h-6 w-6 cursor-pointer" onClick={() => navigate('/cart')} />
              { (cartItems.length !== 0) && <span className="w-5 h-5 rounded-full bg-secondary flex justify-center items-center text-[10px] font-semibold text-white absolute right-[-14px] bottom-[-10px]">{cartItems.length}</span> }
            </div>
            <RxHamburgerMenu className="w-6 h-6" onClick={() => {
              setOpenMenu(true);
            }} />
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item, index) => (
              <Link
                key={index}
                to={item.Nav_Link}
                className="text-md font-semibold leading-6 text-gray-900 hover:text-primary"
              >
                {item.Nav_Text}
              </Link>
            ))}
          </div>
          <div className="font-montserrat hidden lg:flex lg:flex-1 lg:justify-end space-x-4">
            {auth.user_id ? <>
              <Link className="text-md font-semibold leading-6 text-gray-900 hover:text-primary" to="/my-account">
                Account
              </Link>
              <Link className="text-md font-semibold leading-6 text-gray-900 hover:text-primary" onClick={() => {
                removeCookie('user');
                setAuth({
                  user_name: '',
                  user_id: '',
                  loggedIn_status: 'Logged-Out'
                })
                navigate('/')
              }}>
                Logout
              </Link>
            </> : <>
              <Link className="text-md font-semibold leading-6 text-gray-900 hover:text-primary" to="/auth/register">
                Register
              </Link>
              <Link className="text-md font-semibold leading-6 text-gray-900 hover:text-primary" to="/login">
                Login
              </Link>
            </>
            }
            <div className="relative">
              <FaCartShopping className="mt-0 text-primary h-6 w-6 cursor-pointer" onClick={() => navigate('/cart')} />
              { (cartItems.length !== 0) && <span className="w-5 h-5 rounded-full bg-secondary flex justify-center items-center text-[10px] font-semibold text-white absolute right-[-14px] bottom-[-10px]">{cartItems.length}</span> }
            </div>
          </div>
        </nav>
        { openMenu && <div>
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-md font-bold leading-6 text-gray-900 text-secondary text-2xl">
                Dexata - Arena
              </Link>
              <div className="flex">
                <MdOutlineClose className="h-6 w-6" onClick={() => {
                  setOpenMenu(false);
                }} />
              </div>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray">
                <div className="space-y-4 py-6 flex flex-col font-montserrat">
                  {navigation.map((item, index) => (
                    <Link
                      key={index}
                      to={item.Nav_Link}
                      className="text-md font-semibold leading-6 text-gray-900 hover:text-primary"
                    >
                      {item.Nav_Text}
                    </Link>
                  ))}
                </div>
                <div className="font-montserrat space-y-4 flex flex-col py-6">
                  {auth.user_id ? <>
                    <Link className="text-md font-semibold leading-6 text-gray-900 hover:text-primary" to="/my-account">
                      Account
                    </Link>
                    <Link className="text-md font-semibold leading-6 text-gray-900 hover:text-primary" onClick={() => {
                      removeCookie('user');
                      setAuth({
                        user_name: '',
                        user_id: '',
                        loggedIn_status: 'Logged-Out'
                      })
                      navigate('/')
                    }}>
                      Logout
                    </Link>
                  </> : <>
                    <Link className="text-md font-semibold leading-6 text-gray-900 hover:text-primary" to="/auth/register">
                      Register
                    </Link>
                    <Link className="text-md font-semibold leading-6 text-gray-900 hover:text-primary" to="/login">
                      Login
                    </Link>
                  </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div> }
      </header>
    </>
  );
}
