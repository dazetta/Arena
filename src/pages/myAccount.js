import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function MyAccount() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    var dataLayer = {
      "page_name" : "myAccountDashboard",
      "page_type" : "MyAccount",
      "page_section": "MyAccount",
      "login_status": auth.loggedIn_status,
      "currency": "usd",
      "channel": "web"
    }
    auth.user_id && (dataLayer["customer_id"] = auth.user_id);
  }, []);

  if(window.alloy){
    window.alloy("sendEvent", {
      "renderDecisions": true,
      decisionScopes: ["__view__"],
      "xdm": {
        "web": {
          "webPageDetails": {
            "viewName": "myAccount"
          }
        }
      }
    })
  }

  return (
    <div className="bg-white">
      <div className="bg-[#0351aa] py-5">
        <div className="mx-auto text-center max-w-2xl px-4 flex justify-between items-center sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl text-center font-medium tracking-tight text-white">
            My Account
          </h2>
        </div>
      </div>
      <div className="mx-auto text-center max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-4 gap-4 py-10">
          <div className="bg-[#0351aa] p-5 text-left">
            <h3 className="text-white font-semibold text-md">Links:</h3>
            <ul className="list list-disc pl-5">
              <li className="text-white cursor-pointer" onClick={() => navigate('/my-orders')}>My Orders</li>
              <li className="text-white cursor-pointer" onClick={() => navigate('/my-offers')}>My Offers</li>
            </ul>
          </div>
          <div className="col-span-3 flex flex-col gap-4 border p-5">
            <div className="aspect-w-1 aspect-h-1 w-28 overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none">
              <img
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                alt={""}
                className="h-full w-full object-cover rounded-full object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="w-full">
              <p className="text-lg text-left font-bold text-gray-900">
                Welcome {auth?.user_name}!
              </p>

              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-[#0351aa]">
                  User Id: {auth?.user_id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
