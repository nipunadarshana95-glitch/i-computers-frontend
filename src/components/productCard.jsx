import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductCard(props) {
    const product = props.product;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="w-[300px] h-[400px] m-4"
        >
            <Link 
                to={"/overview/" + product.productID} 
                className="w-full h-full block shadow-2xl cursor-pointer relative group rounded-2xl overflow-hidden bg-slate-900/90 border border-white/10 text-white"
            >
                <div className="w-full h-[250px] relative overflow-hidden bg-white flex justify-center items-center">
                    {product.images[1] && (
                        <img
                            src={product.images[1]}
                            className="w-full h-full absolute object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                    )}
                    <img
                        src={product.images[0]}
                        className={`w-full h-full absolute object-cover transition-opacity duration-500 ${
                            product.images[1] ? "group-hover:opacity-0" : "group-hover:scale-110 transform"
                        }`}
                    />
                </div>
                
                <div className="w-full h-[150px] p-4 flex flex-col justify-between bg-slate-900/80">
                    <h1 className="text-center text-lg font-bold tracking-wide text-slate-100 line-clamp-1">
                        {product.name}
                    </h1>
                    
                    <div className="w-full flex flex-col items-center mb-2">
                        {product.labelledPrice > product.price && (
                            <h2 className="text-slate-400 line-through decoration-rose-500/70 decoration-2 text-sm">
                                LKR. {product.labelledPrice.toFixed(2)}
                            </h2>
                        )}
                        <h2 className="text-cyan-400 font-extrabold text-xl mt-0.5">
                            LKR. {product.price.toFixed(2)}
                        </h2>
                    </div>
                </div>

                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4">
                    <h1 className="text-center text-lg font-bold text-white mb-2 px-2 line-clamp-2">
                        {product.name}
                    </h1>
                    <h2 className="text-cyan-400 font-black text-xl mb-6">
                        LKR. {product.price.toFixed(2)}
                    </h2>
                    <button className="border-2 border-cyan-500 text-cyan-400 bg-cyan-950/40 hover:bg-cyan-500 hover:text-slate-950 font-black rounded-xl transition-all duration-300 h-[48px] w-[160px] flex justify-center items-center shadow-lg shadow-cyan-500/20 active:scale-95">
                        View Details
                    </button>
                </div>
            </Link>
        </motion.div>
    );
}