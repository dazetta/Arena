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
        if (CONFIG.offerDataFallback) {
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
            "page_name": "myOffers",
            "page_type": "MyOffers",
            "page_section": "MyAccount",
            "login_status": auth.loggedIn_status,
            "currency": "usd",
            "channel": "web",
            "offer_code": offers.map(offer => offer.offer_code)
        }
        auth.user_id && (dataLayer["customer_id"] = auth.user_id);
    }, [offers]);

    return <div className="py-16 mx-auto text-center max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="font-montserrat leading-normal text-center text-secondary text-4xl font-bold mb-4">Offers</h2>
        <div className="max-w-2xl flex flex-col space-y-6 justify-center m-auto">
            {loader ? <Loader /> : <>
                {offers?.length > 0 ? (offers?.map((offer, index) => {
                    return <div className="flex gap-4 p-5 border border-gray-10 rounded mt-4" key={index}>
                        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={offer.offer_image} alt={offer.offer_title} />
                        <div className="flex flex-col p-4 items-start leading-normal text-left space-y-4">
                            <h5 className="text-xl font-semibold tracking-tight text-black">{offer.offer_title}</h5>
                            <p className="text-black"><span className="font-semibold">{offer.offer_description}</span></p>
                            <p className="text-black">Offer code: <span className="font-semibold">{offer.offer_code}</span></p>
                        </div>
                    </div>
                })) : <h1 className="text-3xl text-gray-900 font-bold text-center">Oops! You don't have any offers</h1>}
            </>}
        </div>
    </div>;
};