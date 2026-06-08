import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // Fetch all reviews on component mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!loaded) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/reviews", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    setReviews(response.data);
                    setLoaded(true);
                })
                .catch((err) => {
                    console.error("Error fetching reviews:", err);
                    setLoaded(true);
                });
        }
    }, [loaded]);

    // Handle Review Delete
    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                await axios.delete(import.meta.env.VITE_BACKEND_URL + `/reviews/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Update state locally after deletion
                setReviews(reviews.filter((review) => review._id !== id));
                alert("Review deleted successfully!");
            } catch (err) {
                console.error("Error deleting review:", err);
                alert("Failed to delete review.");
            }
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Admin Dashboard - Reviews</h2>
            </div>

            {reviews.length === 0 ? (
                <div className="text-center py-10 text-gray-500 font-medium">
                    No reviews found.
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
                    <table className="w-full text-left border-collapse bg-white">
                        <thead>
                            <tr className="bg-slate-900 text-white font-semibold text-sm">
                                <th className="p-4">PRODUCT NAME</th>
                                <th className="p-4">CUSTOMER NAME</th>
                                <th className="p-4">EMAIL</th>
                                <th className="p-4">RATING</th>
                                <th className="p-4">COMMENT</th>
                                <th className="p-4 text-center">ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-600">
                            {reviews.map((review) => (
                                <tr key={review._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 font-semibold text-slate-800">{review.productName}</td>
                                    <td className="p-4">{review.name}</td>
                                    <td className="p-4 text-slate-500">{review.email}</td>
                                    <td className="p-4">
                                        <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-bold">
                                            ⭐ {review.rating} / 5
                                        </span>
                                    </td>
                                    <td className="p-4 max-w-xs truncate text-slate-500" title={review.comment}>
                                        {review.comment}
                                    </td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => handleDelete(review._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md font-semibold text-xs transition-colors shadow-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}