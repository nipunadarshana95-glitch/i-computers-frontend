import React, { useState } from "react";
import axios from "axios";

export default function AddReviewForm({ productID, productName }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    // Assuming user details are stored in localStorage after customer login
    const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest User", email: "guest@example.com" };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const reviewData = {
            productID: productID,              // Passed from parent components
            productName: productName,          // Passed from parent components
            name: user.name,                   // Logged in user name
            email: user.email,                 // Logged in user email
            rating: Number(rating),
            comment: comment
        };

        axios
            .post(import.meta.env.VITE_BACKEND_URL + "/reviews", reviewData)
            .then((response) => {
                alert("Thank you! Your review has been submitted.");
                setComment(""); // Clear comment box
                setRating(5);   // Reset rating
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error submitting review:", error);
                alert(error.response?.data?.message || "Failed to submit review");
                setLoading(false);
            });
    };

    return (
        <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md my-6 text-slate-800">
            <h3 className="text-xl font-bold mb-4">Write a Customer Review</h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Rating Select Dropdown */}
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm">Your Rating:</label>
                    <select 
                        value={rating} 
                        onChange={(e) => setRating(e.target.value)}
                        className="border border-slate-300 rounded-xl p-2.5 max-w-xs focus:outline-none focus:border-cyan-500"
                    >
                        <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                        <option value="4">⭐⭐⭐⭐ (4/5)</option>
                        <option value="3">⭐⭐⭐ (3/5)</option>
                        <option value="2">⭐⭐ (2/5)</option>
                        <option value="1">⭐ (1/5)</option>
                    </select>
                </div>

                {/* Comment Textarea Box */}
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm">Your Review:</label>
                    <textarea 
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts about this product..."
                        className="border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-cyan-500 resize-none"
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
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