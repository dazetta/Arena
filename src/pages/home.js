import React, { useEffect } from "react";
import Hero from "../components/hero";
import Categories from "../components/category";
import Promotion from "../components/promotion";
import Products from "../components/products";

export default function Home() {
  useEffect(() => {
    if(window.utag) {
      window.utag.view({
        "page_name" : "Arena Demo App",
        "page_type" : "home",
        "site_region": "en_us",
        "site_currency": "usd",
        "tealium_event": "home_view"
      })
    }
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
