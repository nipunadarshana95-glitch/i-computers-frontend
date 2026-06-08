import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            axios.get('https://computers-backend.onrender.com/products')
                .then((response) => {
                    console.log(response.data);
                    setProducts(response.data);
                    setLoaded(true);
                });
        }
    }, []);

    return (
        <div className="relative w-full min-h-screen text-white flex flex-col items-center">
            
            <div className="fixed inset-0 bg-slate-950 min-h-screen w-full -z-10" />
            
            <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none -z-10" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none -z-10" />

            <div className="w-full sticky top-0 bg-slate-950/70 backdrop-blur-md border-b border-white/10 flex justify-center items-center py-6 z-40 px-4 shadow-2xl shadow-black/40">
                <input
                    type="text"
                    placeholder="Search premium products..."
                    className="w-full max-w-xl px-6 py-3 bg-slate-900/60 border border-white/10 rounded-xl outline-none text-white placeholder-slate-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 shadow-inner transition-all duration-300"          
                    onChange={async (e) => {
                        if (e.target.value == "") {
                            setLoaded(false);
                            await axios.get('https://computers-backend.onrender.com/products')
                                .then((response) => {
                                    console.log(response.data);
                                    setProducts(response.data);
                                    setLoaded(true);
                                });
                            setLoaded(true);
                        } else {
                            awaitaxios.get('https://computers-backend.onrender.com/products/search?key=' + e.target.value)
                                .then((response) => {
                                    console.log(response.data);
                                    setProducts(response.data);
                                });
                            setLoaded(true);
                        }
                    }}
                />
            </div>

            {!loaded ? (
                <div className="relative z-10 flex justify-center items-center h-[50vh] w-full">
                    <Loader />
                </div>
            ) : (
                <div className="relative z-10 w-full max-w-7xl flex justify-center flex-row flex-wrap gap-4 px-4 pt-8 pb-32">
                    {products.map((item) => {
                        return <ProductCard key={item.productID} product={item} />;
                    })}
                </div>
            )}
        </div>
    );
}