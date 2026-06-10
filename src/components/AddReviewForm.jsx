import React, { useState } from "react";
import axios from "axios";

export default function AddReviewForm({ productID, productName }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    
    
    const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest User", email: "guest@example.com" };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(false); 
        const token = localStorage.getItem("token");
        
        
        const cleanToken = token ? token.replace(/["']/g, "").trim() : "";

        if (!comment.trim()) {
            alert("Please enter a comment before submitting.");
            return;
        }

        setLoading(true);

        const reviewData = { 
            productID, 
            productName, 
            name: user.name, 
            email: user.email, 
            rating: Number(rating), 
            comment 
        };


        axios.post(`${import.meta.env.VITE_BACKEND_URL}/reviews`, reviewData, {
            headers: {
                Authorization: `Bearer ${cleanToken}`
            }
        })
        .then(() => {
            alert("Thank you! Your review has been submitted.");
            setComment("");
            setRating(5);
        })
        .catch((error) => {
            console.error("Review Submission Error:", error.response || error);
            alert(error.response?.data?.message || "Failed to submit review. Check backend routes.");
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md my-6 text-slate-800">
            <h3 className="text-xl font-bold mb-4">Write a Customer Review</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm">Your Rating:</label>
                    <select 
                        value={rating} 
                        onChange={(e) => setRating(e.target.value)} 
                        className="border rounded-xl p-2.5 max-w-xs focus:outline-none focus:border-cyan-500 bg-white"
                    >
                        <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                        <option value="4">⭐⭐⭐⭐ (4/5)</option>
                        <option value="3">⭐⭐⭐ (3/5)</option>
                        <option value="2">⭐⭐ (2/5)</option>
                        <option value="1">⭐ (1/5)</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm">Your Review:</label>
                    <textarea 
                        rows="4" 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        placeholder="Share your thoughts..." 
                        className="border rounded-xl p-3 focus:outline-none focus:border-cyan-500 resize-none text-black" 
                        required
                    ></textarea>
                </div>
                <button 
                    type="submit" 
                    disabled={loading} 
                    className="bg-cyan-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-cyan-700 transition self-start disabled:bg-slate-400 cursor-pointer"
                >
                    {loading ? "Submitting..." : "Submit Review"}
                </button>
            </form>
        </div>
    );
}