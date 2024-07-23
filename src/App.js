import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Category from "./pages/category";
import Home from "./pages/home";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Thankyou from "./pages/thankyou";
import Login from "./pages/login";
import MyOrders from "./pages/myOrder";
import MyOffers from "./pages/myOffers";
import MyAccount from "./pages/myAccount";
import { AuthContext } from "./Context/AuthContext";
import { useState, useEffect } from "react";
import { CONFIG } from "./config/index";
import { AppDataContext } from "./Context/AppDataContext";
import localProducts from './data/products';
import { getCookie } from "./utils";
import localCategories from './data/categories';
import Loader from "./components/Loader";
import Register from "./pages/register";
import RegisterSuccess from "./pages/register-success";
import Search from "./pages/searchResult/searchResult";

function App() {
  const [auth, setAuth] = useState({
    user_name: '',
    user_id: '',
    loggedIn_status: 'Logged-Out'
  });
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  });
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    var userInfo = JSON.parse(getCookie('user'));
    if (userInfo) {
      setAuth({
        user_name: userInfo.user_name,
        user_id: userInfo.user_id,
        loggedIn_status: 'Logged-In'
      });
    }

    if (CONFIG.appDataFallback) {
      try {
        const appDataURL = CONFIG.BASE_URL + CONFIG.GET_APP_DATA;
        fetch(appDataURL, {
          method: "GET",
          redirect: "follow",
        }).then(response => response.json()).then(data => {
          setCategories(data.categories)
          setProducts(data.products)
        })
      } catch (err) {
        // console.log(err);
      }

    } else {
      setProducts(localProducts);
      setCategories(localCategories);
    }


  }, []);

  // Swiching from BrowserRouter to HashRouter as GitHub pages doesn't support BrowserRouter.
  // https://stackoverflow.com/questions/71984401/react-router-not-working-with-github-pages
  // https://reactrouter.com/en/main/router-components/hash-router
  
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <AppDataContext.Provider value={{ products, categories, cartItems, setCartItems }}>
        {products.length > 0 ? (
          <HashRouter>
            <Layout>
              <div id="error-alert"></div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/register-successful" element={<RegisterSuccess />} />
                <Route path="/product/:slug" element={<Product />} />
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/thank-you" element={<Thankyou />} />
                <Route path="/my-account" element={<MyAccount />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/my-offers" element={<MyOffers />} />
                <Route path="/thank-you" element={<Thankyou />} />
              </Routes>
            </Layout>
          </HashRouter>
        ) : (
          <div className="flex justify-center align-center h-screen">
            <Loader />
          </div>
        )}
      </AppDataContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
