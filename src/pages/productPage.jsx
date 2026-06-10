import axios from "axios";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (searchQuery.trim() === "") {
                    const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/products");
                    setProducts(response.data);
                } else {
                    const response = await axios.get(
                        import.meta.env.VITE_BACKEND_URL + "/products/search/" + searchQuery
                    );
                    setProducts(response.data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoaded(true);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchProducts();
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-[#0b0f19]">
            {!loaded ? (
                <Loader />
            ) : (
                <div className="w-full flex flex-col items-center p-6">
                    
                    {/* Dynamic Styled Search Bar Wrapper */}
                    <div className="w-full max-w-2xl relative mb-10 mt-4 group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <BiSearch className="text-slate-400 text-xl group-focus-within:text-cyan-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search high-performance hardware..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-black/40 text-white border border-white/10 rounded-2xl outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 shadow-lg backdrop-blur-md transition-all placeholder:text-slate-500 text-sm"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-4 flex items-center text-xs text-slate-400 hover:text-white transition-colors"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Products Grid Layout */}
                    {products.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-slate-400 text-lg">No products found matching your search.</p>
                        </div>
                    ) : (
                        <div className="w-full max-w-6xl flex justify-center gap-6 flex-row flex-wrap">
                            {products.map((item) => (
                                <ProductCard key={item.productID} product={item} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}