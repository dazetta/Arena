import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function MyAccount() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    var dataLayer = {
      "page_name": "myAccountDashboard",
      "page_type": "MyAccount",
      "page_section": "MyAccount",
      "login_status": auth.loggedIn_status,
      "currency": "usd",
      "channel": "web"
    }
    auth.user_id && (dataLayer["customer_id"] = auth.user_id);
    if(window.utag) {
      window.utag.view(dataLayer);
    }
  }, []);

  return (
    <div className="mx-auto max-w-2xl pb-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8 font-montserrat">
      <h2 className="font-montserrat leading-normal text-center text-secondary text-4xl font-bold mb-8">My Account</h2>
      <div className="mx-auto text-center max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="max-w-2xl m-auto space-y-4">
          <div className="flex flex-col items-center gap-4 border border-gray-10 rounded p-5">
            <div className="aspect-w-1 aspect-h-1 w-28 overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none">
              <img
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                alt={""}
                className="h-full w-full object-cover rounded-full object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="m-auto text-center font-montserrat">
              <p className="text-lg font-semibold">
                Welcome {auth?.user_name}!
              </p>
              <p className="text-lg font-medium text-secondary">
                User Id: {auth?.user_id}
              </p>
            </div>
          </div>
          <div className="p-5 text-left border border-gray-10 rounded">
            <div className="flex gap-2">
              <a href="#" className="inline-flex w-1/2 items-center justify-center p-5 text-base font-medium text-black rounded-lg bg-gray-10" onClick={(e) => {
                e.preventDefault();
                navigate('/my-orders')
              }}>
                <span className="w-full">My Orders</span>
                <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
              <a href="#" className="inline-flex w-1/2 items-center justify-center p-5 text-base font-medium text-black rounded-lg bg-gray-10" onClick={(e) => {
                e.preventDefault();
                navigate('/my-offers')
              }}>
                <span className="w-full">My Offers</span>
                <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
