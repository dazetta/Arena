import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";
import { convertToSlug } from "../utils";
import { CONFIG } from "../config";
import Loader from "../components/Loader";
import { AuthContext } from "../Context/AuthContext";

export default function MyOrders() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const { auth } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);

  const productNavigate = (name) => {
    return navigate(`/product/${convertToSlug(name)}`);
  };

  const url = CONFIG.BASE_URL + CONFIG.GET_USER_ORDER + userData?.user_id;

  const fetchOrders = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  };

  const getProduct = (id) => {
    return products?.filter((e) => e.Product_Id === id)?.[0];
  };

  useEffect(() => {
    fetchOrders();
    var dataLayer = {
      "pageName" : "myOrders",
      "pageType" : "MyOrders",
      "pageSection": "MyAccount",
      "customerId": auth.user_id,
      "loginStatus": auth.loggedIn_status,
      "currency": "usd",
      "channel": "web"
    }
    console.log(dataLayer);
  }, []);

  return (
    <div className="bg-white">
      <div className="bg-[#0351aa] py-5">
        <div className="mx-auto text-center max-w-2xl px-4 flex justify-between items-center sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl text-center font-medium tracking-tight text-white">
            My Orders
          </h2>
        </div>
      </div>
      {/* {
    "Order_Id": 1670536409298,
    "Order_Date": "2022-12-08T21:53:30.006Z",
    "User_Id": "test@test.com",
    "Product_Id": "prod2",
    "Product_Price": 120 */}

      <div className="mx-auto text-center max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-4 py-10">
          {orders?.length > 0 ? (orders?.map((order, index) => {
            return <div className="border p-5">
              <div className="flex justify-between">
                <p className="text-lg text-left font-bold text-gray-900">
                  Order Id: {order?.Order_Id}
                </p>
                <p className="text-lg text-left font-bold text-gray-900">
                  Order Date:{" "}
                  {new Date(order?.Order_Date).toLocaleDateString()}
                </p>
              </div>
              { JSON.parse(order?.Products).map((item) => {
                return <div className="flex gap-4 border p-5 mt-5" key={index}>
                  <div className="aspect-w-1 aspect-h-1 w-72 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-60">
                    <img
                      src={getProduct(item.prod_id)?.Product_Thumbnail_Image}
                      alt={""}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <p
                        className="text-lg font-medium text-[#0351aa]"
                        onClick={() => productNavigate(getProduct(item.prod_id)?.Product_Name)}
                      >
                        {getProduct(item.prod_id)?.Product_Name}
                      </p>
                      <p className="text-xl font-medium text-gray-900">
                        ${getProduct(item.prod_id).Product_Price}
                      </p>
                    </div>
                    <div className="mt-2">
                      <h4 className="text-sm text-gray-900 font-bold text-left">
                        Size: 12
                      </h4>
                    </div>
                  </div>
                </div>
              }) }
            </div>
          })) : <Loader />}

        </div>
      </div>
    </div>
  );
}
