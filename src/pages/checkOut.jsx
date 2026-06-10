import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsChevronUp } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [cart, setCart] = useState(location.state);

    if (location.state == null) {
        navigate("/products");
    }

    function getCartTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    }

    function submitOrder() {
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("You must be logged in to place an order");
            navigate("/login");
            return;
        }

        const orderItems = [];
        cart.forEach((item) => {
            orderItems.push({
                productID: item.productID,
                quantity: item.quantity,
            });
        });

        axios
            .post(
                import.meta.env.VITE_BACKEND_URL + "/orders",
                {
                    name: name,
                    address: address,
                    phone: phone,
                    items: orderItems,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                toast.success("Order placed successfully");
                navigate("/orders");
            })
            .catch(() => {
                toast.error("Error placing order");
            });
    }

    return (
        <div className="w-full flex flex-col items-center p-[20px] text-white">
            {cart.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="w-full lg:w-[50%] lg:h-[150px] pt-[20px] relative rounded-xl overflow-hidden shadow-2xl my-2 flex justify-between border border-white/10 bg-secondary/10 backdrop-blur-md"
                    >
                        <h1 className="lg:hidden w-full overflow-hidden h-[20px] absolute top-[0px] text-white font-semibold">
                            {item.name}
                        </h1>
                        <div className="h-full flex flex-col pl-2">
                            <img
                                src={item.image}
                                className="w-[80px] lg:h-full aspect-square object-cover rounded-lg"
                                alt={item.name}
                            />
                            {item.labelledPrice > item.price && (
                                <h2 className="text-gray-400 line-through decoration-gold/70 decoration-2 mr-2 text-sm">
                                    LKR. {item.labelledPrice.toFixed(2)}
                                </h2>
                            )}
                            <h2 className="text-sm text-gold font-semibold mt-1 lg:mt-2">
                                LKR. {item.price.toFixed(2)}
                            </h2>
                        </div>
                        <div className="hidden lg:flex flex-col justify-center pl-4 w-[300px]">
                            <h1 className="text-2xl font-semibold relative hover:[&_.tooltip]:opacity-100 text-white">
                                <span className="opacity-0 tooltip italic text-sm absolute bottom-[-50px] bg-accent text-white p-2 rounded-lg z-10">
                                    {item.name}
                                </span>
                                {item.name.length > 20
                                    ? item.name.substring(0, 20) + "..."
                                    : item.name}
                            </h1>
                            {item.labelledPrice > item.price && (
                                <h2 className="text-gray-400 line-through decoration-gold/70 decoration-2 mr-2 text-lg">
                                    LKR. {item.labelledPrice.toFixed(2)}
                                </h2>
                            )}
                            <h2 className="text-xl text-gold font-semibold mt-2">
                                LKR. {item.price.toFixed(2)}
                            </h2>
                            <h3 className="text-sm text-gray-300 mt-2">ID: {item.productID}</h3>
                        </div>
                        <div className="min-h-full flex flex-row items-center gap-4 pr-2">
                            <div className="h-full flex flex-col justify-center items-center">
                                <BsChevronUp
                                    onClick={() => {
                                        const copiedCart = [...cart];
                                        copiedCart[index].quantity += 1;
                                        setCart(copiedCart);
                                    }}
                                    className="text-2xl cursor-pointer hover:text-gold transition text-white"
                                />
                                <span className="text-lg font-bold text-white">{item.quantity}</span>
                                <BsChevronUp
                                    onClick={() => {
                                        const copiedCart = [...cart];
                                        copiedCart[index].quantity -= 1;
                                        if (copiedCart[index].quantity < 1) {
                                            copiedCart.splice(index, 1);
                                        }
                                        setCart(copiedCart);
                                    }}
                                    className="rotate-180 text-2xl cursor-pointer hover:text-gold transition text-white"
                                />
                            </div>
                            <span className="pr-4 text-lg font-semibold w-[150px] text-right text-gold">
                                LKR. {(item.price * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    </div>
                );
            })}

            {/* Input Form Section */}
            <div className="w-full lg:w-[50%] p-6 rounded-xl overflow-hidden shadow-2xl my-4 flex flex-wrap justify-between items-center border border-white/10 bg-secondary/5">
                <div className="flex flex-col lg:w-[48%] mb-4">
                    <label className="mb-2 text-white font-medium">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="px-4 py-3 rounded bg-white text-black border-2 border-transparent focus:border-gold outline-none transition w-full font-semibold"
                    />
                </div>
                <div className="flex flex-col lg:w-[48%] mb-4">
                    <label className="mb-2 text-white font-medium">Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="px-4 py-3 rounded bg-white text-black border-2 border-transparent focus:border-gold outline-none transition w-full font-semibold"
                    />
                </div>
                <div className="flex flex-col w-full mb-2">
                    <label className="mb-2 text-white font-medium">Address</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="px-4 py-3 rounded bg-white text-black border-2 border-transparent focus:border-gold outline-none transition w-full h-[100px] font-semibold resize-none"
                    />
                </div>
            </div>

            {/* Total & Submit Section */}
            <div className="w-full lg:w-[50%] h-[100px] rounded-xl overflow-hidden shadow-2xl my-2 flex justify-between items-center border border-white/10 bg-secondary/10 px-4">
                <button
                    onClick={submitOrder}
                    className="px-8 py-3 rounded bg-gold text-black font-bold hover:bg-yellow-500 transition shadow-lg transform active:scale-95"
                >
                    Order Now
                </button>
                <span className="text-2xl font-bold min-w-[150px] text-right text-gold">
                    LKR. {getCartTotal().toFixed(2)}
                </span>
            </div>
        </div>
    );
}
