"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

const ReviewSection = ({ placeId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    rating: 5,
    comment: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/api/reviews/${placeId}`
      );

      setReviews(res.data);

    } catch (err) {
      console.error("Error fetching reviews:", err);

      setError("Unable to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (placeId) {
      fetchReviews();
    }
  }, [placeId]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Get logged-in user's JWT
    const token = localStorage.getItem("token");

    // User is not logged in
    if (!token) {
      setError("Please login to submit a review.");
      return;
    }

    if (!form.comment.trim()) {
      setError("Please write a review.");
      return;
    }

    try {
      setSubmitting(true);

      await axios.post(
        `${API_URL}/api/reviews`,
        {
          placeId,
          rating: Number(form.rating),
          comment: form.comment.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Review added successfully!");

      setForm({
        rating: 5,
        comment: "",
      });

      // Refresh reviews
      await fetchReviews();

    } catch (err) {
      console.error("Error adding review:", err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");

        setError(
          "Your login session has expired. Please login again."
        );
      } else {
        setError(
          err.response?.data?.message ||
          "Unable to add review."
        );
      }

    } finally {
      setSubmitting(false);
    }
  };


  if (loading) {
    return <p>Loading reviews...</p>;
  }


  return (
    <div className="mt-6 border-t pt-6">

      <h2 className="text-2xl font-semibold mb-4">
        User Reviews
      </h2>


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

                  <h3 className="font-semibold text-lg">
                    {rev.username}
                  </h3>

                  <p className="text-yellow-500">
                    {"⭐".repeat(Number(rev.rating))}
                    {" "}
                    ({rev.rating})
                  </p>

                </div>

                <p className="text-gray-700 mt-2">
                  {rev.comment}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Reviewed on{" "}
                  {new Date(
                    rev.created_at
                  ).toLocaleDateString()}
                </p>

              </div>

            ))
          )}

        </div>


        {/* RIGHT SIDE - ADD REVIEW */}

        <div className="w-full md:w-1/3 bg-white p-4 rounded-xl shadow">

          <h3 className="text-lg font-semibold mb-3">
            Add Review
          </h3>


          <form
            onSubmit={handleSubmit}
            className="space-y-3"
          >

            {/* LOGGED-IN USER INFO */}

            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm text-gray-600">
                Your review will be posted using your
                logged-in account.
              </p>
            </div>


            {/* RATING */}

            <select
              className="w-full border p-2 rounded"
              value={form.rating}
              onChange={(e) =>
                setForm({
                  ...form,
                  rating: e.target.value,
                })
              }
              disabled={submitting}
            >

              <option value="5">
                ⭐⭐⭐⭐⭐
              </option>

              <option value="4">
                ⭐⭐⭐⭐
              </option>

              <option value="3">
                ⭐⭐⭐
              </option>

              <option value="2">
                ⭐⭐
              </option>

              <option value="1">
                ⭐
              </option>

            </select>


            {/* COMMENT */}

            <textarea
              placeholder="Write your review..."
              className="w-full border p-2 rounded"
              rows="4"
              value={form.comment}
              onChange={(e) =>
                setForm({
                  ...form,
                  comment: e.target.value,
                })
              }
              disabled={submitting}
              required
            />


            {/* ERROR */}

            {error && (
              <p className="text-red-600 text-sm">
                {error}
              </p>
            )}


            {/* SUCCESS */}

            {message && (
              <p className="text-green-600 text-sm">
                {message}
              </p>
            )}


            {/* SUBMIT */}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
            >

              {submitting
                ? "Submitting..."
                : "Submit Review"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default ReviewSection;