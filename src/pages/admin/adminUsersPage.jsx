import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import { GoVerified } from "react-icons/go";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loaded) {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("Access denied: No token found in localStorage.");
                navigate("/login");
                return;
            }


            const cleanToken = token.replace(/["']/g, "").trim();

            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
                    headers: {
                        Authorization: `Bearer ${cleanToken}`,
                    },
                })
                .then((response) => {
                    console.log("Users loaded successfully:", response.data);
                    setUsers(response.data);
                    setLoaded(true);
                })
                .catch((error) => {
                    console.error("API Request Error:", error.response || error);


                    setLoaded(true);


                    if (error.response?.status === 401) {
                        console.warn("Unauthorized! Check if your backend middleware accepts this token.");
                    }
                });
        }
    }, [loaded, navigate]);

    return (
        <div className="w-full flex justify-center p-10 relative bg-gradient-to-b from-primary to-white text-secondary">
            {loaded ? (
                users && users.length > 0 ? (
                    <table className="w-full max-w-7xl table-auto border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-xl bg-white/70">
                        <thead>
                            <tr className="bg-secondary text-primary/95">
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Image</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Email</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">First Name</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Last Name</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Role</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-secondary/10">
                            {users.map((item, index) => (
                                <tr
                                    key={item._id || index}
                                    className="odd:bg-primary/60 even:bg-white hover:bg-primary/90 transition-colors"
                                >
                                    <td className="px-4 py-3 align-middle">
                                        <img
                                            src={item.image || "/default-avatar.png"}
                                            className="w-[38px] h-[38px] rounded-lg object-cover ring-1 ring-secondary/10"
                                            alt=""
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-secondary/90 flex flex-row items-center gap-2">
                                        {item.email}{" "}
                                        {item.isEmailVerified && <GoVerified className="text-blue-400" />}
                                    </td>
                                    <td className="px-4 py-3 text-sm">{item.firstName}</td>
                                    <td className="px-4 py-3 text-sm font-semibold text-secondary">{item.lastName}</td>
                                    <td className="px-4 py-3 text-sm font-semibold text-secondary">{item.role}</td>
                                    <td className="px-4 py-3 text-sm">
                                        {item.isBlocked ? (
                                            <span className="text-red-500 font-medium">Blocked</span>
                                        ) : (
                                            <span className="text-green-500 font-medium">Active</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <button
                                            className="px-3 py-1 bg-accent text-primary rounded-lg font-medium hover:opacity-90 transition-all"
                                            onClick={async () => {
                                                try {
                                                    const rawToken = localStorage.getItem("token") || "";
                                                    const tokenClean = rawToken.replace(/["']/g, "").trim();

                                                    await axios.put(
                                                        `https://computers-backend.onrender.com/users/toggle-block/${item.email}`,
                                                        { isBlocked: !item.isBlocked },
                                                        { headers: { Authorization: `Bearer ${tokenClean}` } }
                                                    );
                                                    setLoaded(false);
                                                } catch (err) {
                                                    console.error("Failed to update status:", err);
                                                }
                                            }}
                                        >
                                            {item.isBlocked ? "Unblock User" : "Block User"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <p className="text-xl font-semibold text-secondary/70">No registered user accounts found.</p>
                    </div>
                )
            ) : (
                <Loader />
            )}

            <Link
                to="/admin/add-product"
                className="fixed right-[20px] bottom-[20px] w-[56px] h-[56px] flex justify-center items-center text-4xl rounded-full bg-accent text-primary shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
                <BiPlus />
            </Link>
        </div>
    );
}