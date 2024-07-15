import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import navigation from "../../data/navigation";
import { FaCartShopping } from "react-icons/fa6";
import { AuthContext } from "../../Context/AuthContext";
import { removeCookie } from "../../utils";
import { Link } from "react-router-dom";
import { MdOutlineClose, MdClose } from "react-icons/md";
import { RxHamburgerMenu, RxMagnifyingGlass } from "react-icons/rx";
import logo from '../../assets/logo.png';
import { AppDataContext } from "../../Context/AppDataContext";
import "./header.css";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [disableForm, setDisableForm] = useState(true);
  const { auth, setAuth } = useContext(AuthContext);
  const { cartItems } = useContext(AppDataContext);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleChange = (e) => {
    setSearchQuery((e.target.value).trim().toLowerCase());
    setDisableForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
    setSearchQuery("");
    setDisableForm(true);
    setShowSearch(false);
  };

  const handleClickOutside = (event) => {
    if (showSearch && !event.target.closest(".search-form")) {
      setShowSearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  return (
    <>
      <header className="bg-white sticky top-0 z-[999] shadow">
        <div className="bg-primary">
          <div className="mx-auto flex max-w-7xl p-2 text-white">
            <p className="leading-normal text-center w-full">
              <a
                href="/#/category/shoes"
                style={{ display: "inline-block", textAlign: "center", width: "100%" }}
              >
                Get 25% Off sitewide on all products. Use Code: <span className="font-semibold">GET25OFF</span>
              </a>
            </p>
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl items-center justify-between lg:justify-start px-4 py-2.5 font-montserrat">
          <div className="mr-4">
            <Link to="/" className="w-24 block">
              <img src="https://dexata.co/wp-content/uploads/2024/03/arena-ecommerce-logo.png" alt="logo" />
            </Link>
          </div>
          <div className="flex space-x-4 lg:hidden">
            <form action="submit" onSubmit={handleSubmit} className="search-form">
              <input
                type="text"
                className="search-input-header bg-gray-50 border border-gray-10 text-gray-900 sm:text-sm rounded-lg p-2.5 focus:outline-none"
                onChange={handleChange}
                value={searchQuery}
                placeholder="Search Keyword"
              />
              <button disabled={disableForm} type="submit" className="search-btn">
                <img className="search-image" src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-search-icon-png-image_4184112.jpg" alt="search-logo" />
              </button>
            </form>
            <div className="relative">
              <FaCartShopping className="mt-0 text-primary h-6 w-6 cursor-pointer" onClick={() => navigate('/cart')} />
              {cartItems.length !== 0 && (
                <span className="w-5 h-5 rounded-full bg-secondary flex justify-center items-center text-[10px] font-semibold text-white absolute right-[-14px] bottom-[-10px]">
                  {cartItems.length}
                </span>
              )}
            </div>
            <RxHamburgerMenu
              className="w-6 h-6"
              onClick={() => {
                setOpenMenu(true);
              }}
            />
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
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
          <div className="font-montserrat hidden lg:flex lg:flex-1 lg:justify-end gap-x-6">
            {showSearch ? (
              <div className="flex w-full relative search-container">
                <form action="submit" onSubmit={handleSubmit} className="flex w-full relative search-form">
                  <input
                    type="text"
                    className="search-input-header bg-gray-50 border border-gray-10 text-gray-900 sm:text-sm rounded-full w-full p-2.5 focus:outline-none pl-4 pr-10"
                    onChange={handleChange}
                    value={searchQuery}
                    placeholder="Search Keyword"
                  />
                  <button
                    disabled={disableForm}
                    type="submit"
                    className="search-btn absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <RxMagnifyingGlass className="w-5 h-5" />
                  </button>
                </form>
                <MdClose
                  className="search-close-icon"
                  onClick={() => setShowSearch(false)}
                />
              </div>
            ) : (
              <>
                {auth.user_id ? (
                  <>
                    <Link className="text-md font-semibold leading-6 text-gray-900 hover:text-primary" to="/my-account">
                      Account
                    </Link>
                    <Link
                      className="text-md font-semibold leading-6 text-gray-900 hover:text-primary"
                      to="/"
                      onClick={(e) => {
                        e.preventDefault();
                        removeCookie("user");
                        setAuth({
                          user_name: "",
                          user_id: "",
                          loggedIn_status: "Logged-Out",
                        });
                        navigate("/");
                      }}
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link className="text-md font-semibold leading-6 text-gray-900 hover:text-primary" to="/auth/register">
                      Register
                    </Link>
                    <Link className="text-md font-semibold leading-6 text-gray-900 hover:text-primary" to="/auth/login">
                      Login
                    </Link>
                  </>
                )}
                <div className="relative">
                  <FaCartShopping className="mt-0 text-primary h-6 w-6 cursor-pointer" onClick={() => navigate('/cart')} />
                  {cartItems.length !== 0 && (
                    <span className="w-5 h-5 rounded-full bg-secondary flex justify-center items-center text-[10px] font-semibold text-white absolute right-[-14px] bottom-[-10px]">
                      {cartItems.length}
                    </span>
                  )}
                </div>
                <RxMagnifyingGlass className="w-6 h-6 cursor-pointer" onClick={() => setShowSearch(true)} />
              </>
            )}
          </div>
        </nav>
        {openMenu && (
          <div>
            <div className="fixed inset-0 z-10"></div>
            <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="text-md font-bold leading-6 text-gray-900 text-secondary text-2xl">
                  Dexata - Arena
                </Link>
                <div className="flex">
                  <MdOutlineClose
                    className="h-6 w-6"
                    onClick={() => {
                      setOpenMenu(false);
                    }}
                  />
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
                    {auth.user_id ? (
                      <>
                        <Link className="text-md font-semibold leading-6 text-gray-900 hover:text-primary" to="/my-account">
                          Account
                        </Link>
                        <Link
                          className="text-md font-semibold leading-6 text-gray-900 hover:text-primary"
                          to="/"
                          onClick={(e) => {
                            e.preventDefault();
                            removeCookie("user");
                            setAuth({
                              user_name: "",
                              user_id: "",
                              loggedIn_status: "Logged-Out",
                            });
                            navigate("/");
                          }}
                        >
                          Logout
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link className="text-md font-semibold leading-6 text-gray-900 hover:text-primary" to="/auth/register">
                          Register
                        </Link>
                        <Link className="text-md font-semibold leading-6 text-gray-900 hover:text-primary" to="/auth/login">
                          Login
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}