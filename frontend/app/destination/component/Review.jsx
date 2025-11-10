"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewSection = ({ placeId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/${placeId}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [placeId]);

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div className="mt-6 border-t pt-4">
      <h2 className="text-2xl font-semibold mb-4">User Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet. Be the first to share!</p>
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
  );
};

export default ReviewSection;
