import React, { useEffect, useContext } from "react";
import Hero from "../components/hero";
import Categories from "../components/category";
import Promotion from "../components/promotion";
import Products from "../components/products";
import { AuthContext } from "../Context/AuthContext";
/*
export default function Home() {
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    var dataLayer = {
      "page_name" : "Arena Ecommerce",
      "page_type" : "Home",
      "page_section": "Home",
      "login_status": auth.loggedIn_status,
      "currency": "usd",
      "channel": "web"
    }
    auth.user_id && (dataLayer["customer_id"] = auth.user_id);
  }, []);
*/
export default function Home() {
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    window.adobeDataLayer.push({
      "event": "landed",
      "eventInfo": {
          "eventName": "landed"
      },
      "custData": {
        "login_status": auth.loggedIn_status
      },
      "page": {
          "pageName": "Arena Ecommerce",
          "pageType": "Home",
          "page_section": "Home",
          "currency": "usd",
          "channel": "web",
          "viewName": "home"
      }
  });
  }, []);



/*
  if(window.alloy) {
    window.alloy("sendEvent", {
      "renderDecisions": true,
      decisionScopes: ["__view__"],
      "xdm": {
        "web": {
          "webPageDetails": {
            "viewName": "home",
            "Param": "check"
          }
        }
      }
    })
  }

  */
  return (
    <div>
      <Hero />
      <Categories />
      <Promotion />
      <Products />
    </div>
  );
}
