import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { LuBoxes, LuClipboardList } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader";
import AdminUsersPage from "./admin/adminUsersPage";
import AdminReviewsPage from "./admin/AdminReviewsPage";

export default function AdminPage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token == null) {
            navigate("/");
            return;
        }

        const cleanToken = token.replace(/["']/g, "").trim();

        axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
            headers: { Authorization: `Bearer ${cleanToken}` },
        })
        .then((response) => {
            if (response.data?.role?.toLowerCase() === "admin") {
                setUser(response.data);
            } else {
                console.warn("Access denied: User is not an admin.");
                navigate("/");
            }
        })
        .catch((error) => {
            console.error("Admin authentication verification failed:", error);
            navigate("/login");
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="w-full h-full flex bg-accent">
            {user ? (
                <>
                    {/* Left Sidebar Panel */}
                    <div className="w-[300px] bg-accent h-full flex flex-col justify-between py-[20px]">
                        <div>
                            <div className="w-full h-[100px] flex items-center text-primary px-[20px] gap-2">
                                <img src="/logo.png" className="h-12 w-auto object-contain" alt="Admin Logo" />
                                <h1 className="text-2xl font-bold tracking-wide">Admin</h1>
                            </div>

                            <div className="w-full text-white text-2xl flex flex-col pl-[20px] pt-[20px] gap-2">
                                <Link to="/admin" className="w-full flex items-center h-[50px] gap-[12px] hover:text-primary transition-colors duration-200">
                                    <LuClipboardList /> <span>Orders</span>
                                </Link>

                                <Link to="/admin/products" className="w-full flex items-center h-[50px] gap-[12px] hover:text-primary transition-colors duration-200">
                                    <LuBoxes /> <span>Products</span>
                                </Link>

                                <Link to="/admin/users" className="w-full flex items-center h-[50px] gap-[12px] hover:text-primary transition-colors duration-200">
                                    <FiUsers /> <span>Users</span>
                                </Link>

                                <Link to="/admin/reviews" className="w-full flex items-center h-[50px] gap-[12px] hover:text-primary transition-colors duration-200">
                                    <MdOutlineRateReview /> <span>Reviews</span>
                                </Link>
                            </div>
                        </div>

                        <div className="px-[20px]">
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center h-[50px] gap-[12px] text-red-500 hover:text-red-400 font-semibold text-2xl transition-colors duration-200 cursor-pointer bg-transparent border-none outline-none"
                            >
                                <IoLogOutOutline className="text-3xl" /> <span>Logout</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Content Panel with Nested Routes */}
                    <div className="w-[calc(100%-300px)] h-full max-h-full bg-primary border-[10px] border-accent rounded-3xl overflow-y-scroll">
                        <Routes>
                            <Route index element={<AdminOrdersPage />} />
                            <Route path="products" element={<AdminProductsPage />} />
                            <Route path="add-product" element={<AdminAddProductPage />} />
                            <Route path="update-product" element={<AdminUpdateProductPage />} />
                            <Route path="users" element={<AdminUsersPage />} />
                            <Route path="reviews" element={<AdminReviewsPage />} />
                        </Routes>
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
}