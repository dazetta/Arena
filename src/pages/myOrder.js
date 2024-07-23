import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { convertToSlug } from "../utils";
import { CONFIG } from "../config";
import Loader from "../components/Loader";
import { AuthContext } from "../Context/AuthContext";
import { AppDataContext } from "../Context/AppDataContext";

export default function MyOrders() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { products } = useContext(AppDataContext);
  const [loader, setLoader] = useState(true);

  const [orders, setOrders] = useState([]);

  const productNavigate = (name) => {
    return navigate(`/product/${convertToSlug(name)}`);
  };

  const url = CONFIG.BASE_URL + CONFIG.GET_USER_ORDER + auth?.user_id;

  const fetchOrders = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoader(false);
      });
  };

  const getProduct = (id) => {
    return products?.filter((e) => e.Product_Id === id)?.[0];
  };

  useState(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    var dataLayer = {
      "page_name": "myOrders",
      "page_type": "MyOrders",
      "page_section": "MyAccount",
      "login_status": auth.loggedIn_status,
      "currency": "usd",
      "channel": "web",
      "order_id": orders.map(order => order.Order_Id)
    }
    auth.user_id && (dataLayer["customer_id"] = auth.user_id);
    if(window.utag) {
      window.utag.view(dataLayer);
    }
  }, [orders]);

  return (
    <div className="py-16 mx-auto text-center max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="font-montserrat leading-normal text-center text-secondary text-4xl font-bold mb-2">Orders</h2>
      <div className="max-w-2xl flex flex-col space-y-6 justify-center m-auto">
        {loader ? <Loader /> : <> {orders?.length > 0 ? (orders?.map((order, index) => {
          return <div className="border border-gray-10 rounded p-5">
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-black">
                Order Id: {order?.Order_Id}
              </p>
              <p className="text-lg font-semibold text-black">
                Order Date:{" "}
                {new Date(order?.Order_Date).toLocaleDateString()}
              </p>
            </div>
            {JSON.parse(order?.Products).map((item, index) => {
              return <a className="flex gap-4 p-5 border border-gray-10 rounded mt-4" key={index} href="#" onClick={(e) => {
                e.preventDefault();
                productNavigate(getProduct(item.prod_id)?.Product_Name)
              }}>
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={getProduct(item.prod_id)?.Product_Thumbnail_Image} alt="" />
                <div className="flex flex-col p-4 items-start leading-normal text-left space-y-4">
                  <h5 className="text-xl font-semibold tracking-tight text-black">{getProduct(item.prod_id)?.Product_Name}</h5>
                  <p className="text-black">Price: <span className="font-semibold">${getProduct(item.prod_id).Product_Price}</span></p>
                </div>
              </a>
            })}
          </div>
        })) : <h1 className="text-3xl text-gray-900 font-bold text-center">Oops! You don't have any Orders</h1>}
        </>}
      </div>
    </div>
  );
}
