import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Category from "./pages/category";
import Home from "./pages/home";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Thankyou from "./pages/thankyou";
import Login from "./pages/login";
import MyOrders from "./pages/myOrder";
import MyAccount from "./pages/myAccount";
import { AuthContext } from "./Context/AuthContext";
import { useState } from "react";
import { CONFIG } from "./config/index";
import { AppDataContext } from "./Context/AppDataContext";
import localProducts from './data/products';
import { getCookie } from "./utils";

function App() {
  const [auth, setAuth] = useState({
    user_name: '',
    user_id: '',
    loggedIn_status: false
  });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);

  useState(() => {
    var userInfo = JSON.parse(getCookie('user'));
    if (userInfo) {
      setAuth({
        user_name: userInfo.user_name,
        user_id: userInfo.user_id,
        loggedIn_status: true
      });
    }

    if(CONFIG.apiFallback) {
      const productURL = CONFIG.BASE_URL + CONFIG.GET_PRODUCTS;
      const categoryURL = CONFIG.BASE_URL + CONFIG.GET_CATEGORIES;
  
      fetch(productURL, {
        method: "GET",
        redirect: "follow",
      }).then(response => response.json()).then(data => {
        setProducts(data);
      })
  
      fetch(categoryURL, {
        method: "GET",
        redirect: "follow",
      }).then(response => response.json()).then(data => {
        setCategories(data);
      })
      console.log('ajsdlfjlsdafj')
    } else {
      setProducts(localProducts);
    }


  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <AppDataContext.Provider value={{ products, categories }}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="product">
                <Route path=":slug" element={<Product />} />
              </Route>
              <Route path="category">
                <Route path=":slug" element={<Category />} />
              </Route>
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="thank-you" element={<Thankyou />} />
              <Route path="my-account" element={<MyAccount />} />
              <Route path="my-orders" element={<MyOrders />} />
              <Route path="thank-you" element={<Thankyou />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AppDataContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
