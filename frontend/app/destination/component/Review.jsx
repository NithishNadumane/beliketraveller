"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewSection = ({ placeId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    username: "",
    rating: 5,
    comment: "",
  });

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/reviews/${placeId}`
      );
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [placeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/reviews", {
        placeId,
        ...form,
      });

      setForm({ username: "", rating: 5, comment: "" });
      fetchReviews(); // refresh
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div className="mt-6 border-t pt-6">
      <h2 className="text-2xl font-semibold mb-4">User Reviews</h2>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* LEFT SIDE - REVIEWS */}
        <div className="w-full md:w-2/3 bg-gray-50 p-4 rounded-xl shadow h-[400px] overflow-y-auto">
          {reviews.length === 0 ? (
            <p className="text-gray-600">
              No reviews yet. Be the first to share!
            </p>
          ) : (
            reviews.map((rev) => (
              <div
                key={rev.id}
                className="border p-4 mb-3 rounded-xl shadow-sm bg-white"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">{rev.username}</h3>
                  <p className="text-yellow-500">
                    {"⭐".repeat(rev.rating)} ({rev.rating})
                  </p>
                </div>
                <p className="text-gray-700 mt-2">{rev.comment}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Reviewed on{" "}
                  {new Date(rev.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE - ADD REVIEW */}
        <div className="w-full md:w-1/3 bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-3">Add Review</h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              className="w-full border p-2 rounded"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              required
            />

            <select
              className="w-full border p-2 rounded"
              value={form.rating}
              onChange={(e) =>
                setForm({ ...form, rating: e.target.value })
              }
            >
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>

            <textarea
              placeholder="Write your review..."
              className="w-full border p-2 rounded"
              rows="4"
              value={form.comment}
              onChange={(e) =>
                setForm({ ...form, comment: e.target.value })
              }
              required
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Submit Review
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ReviewSection;