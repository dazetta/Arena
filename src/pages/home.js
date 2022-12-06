import React from "react";
import Hero from "../components/hero";
import Categories from "../components/category";
import Promotion from "../components/promotion";
import Products from "../components/products";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <Promotion />
      <Products />
    </div>
  );
}
