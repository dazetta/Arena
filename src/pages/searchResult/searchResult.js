import React, { useEffect, useState, useContext } from 'react';
import "./searchResult.css";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Promotion from "../../components/searchpromo";
import SecondaryButton from '../../components/Buttons/SecondaryButton';
import { AppDataContext } from "../../Context/AppDataContext";
import Loader from "../../components/Loader"; // Assume you have a Loader component

const Search = () => {
    const navigate = useNavigate();
    const { searchResults } = useContext(AppDataContext); // Get searchResults from context
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false); // New state for loading indicator
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if(searchResults[query]) {
            setFilteredProducts(searchResults[query]);
        }
    }, []);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if(searchQuery.length > 0) {
            if(searchResults[searchQuery]) {
                setFilteredProducts(searchResults[searchQuery]);
            } else {
                setFilteredProducts([]);
            }
            navigate(`/search?query=${searchQuery}`);
        }
    }

    return (
        <div className="space-y-8">
            <div className='relative'>
                <img
                    src="https://dexata.co/wp-content/uploads/2024/05/search-banner-image.png"
                    alt=""
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
                <div className='absolute top-0 left-0 right-0 m-auto z-[99] mx-auto max-w-2xl pb-16 px-4 sm:pb-12 sm:px-6 lg:max-w-7xl lg:px-8 font-montserrat'>
                    <h2 className="font-montserrat leading-normal text-center text-secondary text-4xl font-bold mb-4 mt-8">Search results for: "{query}"</h2>
                    <form onSubmit={handleSubmitForm} className="relative search-form">
                        <input
                            autoFocus
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                            className="search-input bg-gray-50 border border-gray-10 text-gray-900 sm:text-sm rounded-full p-2.5 pl-4 pr-10 focus:outline-none"
                            placeholder="Search Keyword"
                        />
                        <button type="submit" className="search-btn">
                            <img className="search-image" src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-search-icon-png-image_4184112.jpg" alt="search-logo" />
                        </button>
                    </form>
                </div>
            </div>
            <div className="mx-auto max-w-2xl pb-16 px-4 sm:pb-12 sm:px-6 lg:max-w-7xl lg:px-8 font-montserrat">
                <Promotion />
                <div className="mt-6">
                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <div className="mt-6 flex flex-col items-center bg-white border border-gray p-4 w-full rounded-lg shadow md:flex-row" key={index}>
                                        <Link to={product.productLink} className='flex items-start'>
                                            <img className="rounded-lg w-64 h-[200px] object-cover" src={product.productImageLink} alt="product thumbnail" />
                                            <div className="ml-4">
                                                <h5 className="mb-4 text-lg font-semibold tracking-tight text-black">{product.productTitle}</h5>
                                                <p className="text-left mb-4">{product.productDesp}</p>
                                                <SecondaryButton onClick={() => navigate(product.productLink)}>
                                                    Buy Now
                                                </SecondaryButton>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                !loading && (
                                    <div className="text-center w-full">
                                        <h1 className="text-3xl text-gray-900 font-semibold text-center">No search results found</h1>
                                    </div>
                                )
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
