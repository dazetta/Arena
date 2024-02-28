import React, { useEffect } from "react";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  useEffect(() =>{
    console.log('asjdflajsdf')
  }, [])
  return (
    <div>
      <Header />
      {children}
      <Footer/>
    </div>
  );
}
