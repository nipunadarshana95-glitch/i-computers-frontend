import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { CgChevronRight } from "react-icons/cg";
import { addToCart } from "../utils/cart";
import AddReviewForm from "../components/AddReviewForm";

export default function ProductOverview() {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); //loading, error, success

    useEffect(() => {
        if (status == "loading") {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productID)
                .then((response) => {
                    setProduct(response.data);
                    setStatus("success");
                })
                .catch(() => {
                    toast.error("Product Not Found");
                    setStatus("error");
                });
        }
    }, []);

    return (
        <>
            {status == "loading" && <Loader />}
            {status == "error" && (
                <h1 className="text-center mt-10 text-2xl">Error loading product.</h1>
            )}
            {status == "success" && (
                <div className="w-full min-h-[calc(100vh-100px)] flex flex-col p-4 md:p-10 bg-white">
                    {/* Main Product Layout Container */}
                    <div className="w-full flex flex-col lg:flex-row gap-6">
                        <h1 className="text-4xl font-semibold lg:hidden text-center sticky top-0 bg-white z-10 py-2">
                            {product.name}
                        </h1>

                        {/* Left Side: Image Slider */}
                        <div className="w-full lg:w-1/2 flex justify-center items-center">
                            <ImageSlider images={product.images} />
                        </div>

                        {/* Right Side: Product Information */}
                        <div className="w-full lg:w-1/2 flex flex-col gap-6">
                            <h1 className="text-4xl font-semibold hidden lg:block">
                                {product.name}
                            </h1>
                            <h2 className="text-lg text-secondary/80">{product.productID}</h2>
                            <h3 className="text-lg text-secondary/80 flex items-center">
                                <CgChevronRight /> {product.category}
                            </h3>
                            
                            {/* Alternative Names */}
                            {product.altNames && product.altNames.length > 0 && (
                                <h3 className="text-md text-secondary/80">
                                    {product.altNames.join(" | ")}
                                </h3>
                            )}
                            
                            <p className="text-md text-justify text-secondary/90 h-32 overflow-y-auto pr-2">
                                {product.description}
                            </p>
                            
                            {/* Price Section */}
                            <div className="w-full">
                                {product.labelledPrice > product.price && (
                                    <h2 className="text-secondary/80 line-through decoration-gold/70 decoration-2 mr-2 text-xl">
                                        LKR. {product.labelledPrice.toFixed(2)}
                                    </h2>
                                )}
                                <h2 className="text-accent font-semibold text-3xl">
                                    LKR. {product.price.toFixed(2)}
                                </h2>
                            </div>

                            {/* Action Buttons */}
                            <div className="w-full flex flex-row gap-4 mt-4">
                                <button
                                    onClick={() => {
                                        addToCart(product, 1);
                                    }}
                                    className="bg-accent text-white px-6 py-3 rounded hover:bg-accent/90 transition font-medium shadow-sm"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => {
                                        navigate("/checkout", {
                                            state: [
                                                {
                                                    productID: product.productID,
                                                    name: product.name,
                                                    price: product.price,
                                                    labelledPrice: product.labelledPrice,
                                                    image: product.images[0],
                                                    quantity: 1,
                                                },
                                            ],
                                        });
                                    }}
                                    className="border-2 border-accent text-accent px-6 py-3 rounded hover:bg-accent hover:text-white transition font-medium"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Divider Rule */}
                    <hr className="my-10 border-slate-200" />

                    {/* 👇 Customer Review Section Added Here */}
                    <div className="w-full flex flex-col items-center lg:items-start">
                        <AddReviewForm 
                            productID={product.productID || product._id} 
                            productName={product.name} 
                        />
                    </div>
                </div>
            )}
        </>
    );
}