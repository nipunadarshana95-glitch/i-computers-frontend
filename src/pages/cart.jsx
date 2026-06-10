import { useState } from "react";
import { addToCart, getCart, getCartTotal } from "../utils/cart";
import { BsChevronUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
    const [cart, setCart] = useState(getCart());

    return (
        <div className="relative w-full min-h-[calc(100vh-100px)] overflow-hidden flex flex-col items-center p-[20px] py-12">
            
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src="/bg-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/90 z-10" />

            <div className="relative z-20 text-center mb-8">
                <h2 className="text-3xl font-extrabold text-white tracking-wide">
                    Your Shopping <span className="text-cyan-400">Cart</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">Review the components and gadgets inside your rig.</p>
            </div>

            <div className="w-full flex flex-col items-center">
                <AnimatePresence mode="popLayout">
                    {cart.map((item, index) => {
                        return (
                            <motion.div
                                key={item.productID || index}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: -50 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="relative z-20 w-full lg:w-[50%] pt-[20px] lg:h-[150px] rounded-xl overflow-hidden my-2 flex justify-between bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 p-4 text-white"
                            >
                                <h1 className="lg:hidden w-full overflow-hidden h-[20px] absolute top-[5px] left-4 font-semibold text-slate-200">
                                    {item.name}
                                </h1>
                                <div className="h-full flex flex-col justify-center">
                                    <img
                                        src={item.image}
                                        className="h-[80px] lg:h-full aspect-square object-cover rounded-lg bg-slate-800"
                                    />
                                    {item.labelledPrice > item.price && (
                                        <h2 className="text-slate-400 line-through decoration-rose-500/70 decoration-2 mr-2 text-sm mt-1">
                                            LKR. {item.labelledPrice.toFixed(2)}
                                        </h2>
                                    )}
                                    <h2 className="text-sm text-cyan-400 font-bold mt-1">
                                        LKR. {item.price.toFixed(2)}
                                    </h2>
                                </div>
                                <div className="hidden lg:flex flex-col justify-center pl-4 w-[300px]">
                                    <h1 className="text-xl font-semibold relative hover:[&_.tooltip]:opacity-100 text-white">
                                        <span className="opacity-0 tooltip italic text-sm absolute bottom-[-50px] bg-cyan-600 text-white p-2 rounded-lg z-30 transition-opacity">
                                            {item.name}
                                        </span>
                                        {item.name.length > 20
                                            ? item.name.substring(0, 20) + "..."
                                            : item.name}
                                    </h1>
                                    {item.labelledPrice > item.price && (
                                        <h2 className="text-slate-400 line-through decoration-rose-500/70 decoration-2 mr-2 text-md mt-1">
                                            LKR. {item.labelledPrice.toFixed(2)}
                                        </h2>
                                    )}
                                    <h2 className="text-lg text-cyan-400 font-bold mt-1">
                                        LKR. {item.price.toFixed(2)}
                                    </h2>
                                    <h3 className="text-sm text-slate-500 mt-1">{item.productID}</h3>
                                </div>
                                <div className="min-h-full flex flex-row items-center gap-4">
                                    <div className="h-full flex flex-col justify-center items-center">
                                        <BsChevronUp
                                            onClick={() => {
                                                addToCart(item, 1);
                                                const newCart = getCart();
                                                setCart(newCart);
                                            }}
                                            className="text-2xl cursor-pointer text-slate-400 hover:text-cyan-400 transition"
                                        />
                                        <span className="text-lg font-bold my-1 text-white">{item.quantity}</span>
                                        <BsChevronUp
                                            onClick={() => {
                                                addToCart(item, -1);
                                                const newCart = getCart();
                                                setCart(newCart);
                                            }}
                                            className="rotate-180 text-2xl cursor-pointer text-slate-400 hover:text-cyan-400 transition"
                                        />
                                    </div>
                                    <span className="pr-4 text-lg font-bold w-[150px] text-right text-white">
                                        LKR. {(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <div className="relative z-20 w-full lg:w-[50%] h-[100px] rounded-xl overflow-hidden my-2 flex justify-between items-center bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl p-4">
                <Link
                    to="/checkout"
                    className="px-6 py-3 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-500 shadow-lg shadow-cyan-600/20 transition"
                    state={cart}
                >
                    Checkout
                </Link>
                <div className="text-right pr-4">
                    <span className="text-xs uppercase tracking-wider text-slate-400 block">Total Amount</span>
                    <span className="text-xl font-black text-white block mt-0.5">
                        LKR. {getCartTotal().toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}

