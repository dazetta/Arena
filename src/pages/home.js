import React, { useEffect, useContext } from "react";
import Hero from "../components/hero";
import Categories from "../components/category";
import Promotion from "../components/promotion";
import Products from "../components/products";
import { AuthContext } from "../Context/AuthContext";

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

  return (
    <div>
      <Hero />
      <Categories />
      <Promotion />
      <Products />
    </div>
  );
}
