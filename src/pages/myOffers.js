import React, { useEffect, useState, useContext } from "react";
import { CONFIG } from "../config";
import Loader from "../components/Loader";
import { AuthContext } from "../Context/AuthContext";
import localOffers from '../data/offer';

export default function MyOffers() {
    const { auth } = useContext(AuthContext);
    const [offers, setOffers] = useState([]);
    const [loader, setLoader] = useState(true);

    const url = CONFIG.BASE_URL + CONFIG.GET_USER_OFFERS + auth?.user_id;

    const fetchOrders = () => {
        if(CONFIG.offerDataFallback) {
            fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setOffers(data)
                setLoader(false);
            });
        } else {
            setOffers(localOffers)
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);
    
    useEffect(() => {
        var dataLayer = {
            "page_name" : "myOffers",
            "page_type" : "MyOffers",
            "page_section": "MyAccount",
            "login_status": auth.loggedIn_status,
            "currency": "usd",
            "channel": "web",
            "offer_code": offers.map(offer => offer.offer_code)
        }
        auth.user_id && (dataLayer["customer_id"] = auth.user_id);
    }, [offers]);

    return <div className="bg-white">
        <div className="bg-[#0351aa] py-5">
        <div className="mx-auto text-center max-w-2xl px-4 flex justify-between items-center sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl text-center font-medium tracking-tight text-white">
            My Offers
            </h2>
        </div>
        </div>
        <div className="mx-auto text-center max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-4 py-10">
            {loader ? <Loader /> : <>
                {offers?.length > 0 ? (offers?.map((offer, index) => {
                return <div className="flex gap-4 border p-5 mt-5" key={index}>
                    <div className="aspect-w-1 aspect-h-1 w-72 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-60">
                    <img
                        src={offer.offer_image}
                        alt={offer.offer_title}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                    </div>
                    <div className="w-full">
                        <div className="text-left">
                            <p className="text-lg font-medium text-[#0351aa]">{offer.offer_title}</p>
                            <p className="text-xl font-medium text-gray-900">{offer.offer_description}</p>
                            <p className="text-l font-medium text-gray-900">Offer code: {offer.offer_code}</p>
                        </div>
                    </div>
                </div>
                })) : <h1 class="text-3xl text-gray-900 font-bold text-center">Oops! You don't have any offers</h1> }
            </>}
        </div>
        </div>
    </div>;
};