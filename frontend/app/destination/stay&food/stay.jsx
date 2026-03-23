import { useState, useEffect } from "react";
import axios from "axios";

export default function StayFood({ districtId }) {
   const API = process.env.NEXT_PUBLIC_API_URL;
  const [category, setCategory] = useState("food");
  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {

        let table = "";

        if (category === "food") table = "popular_food_places";
        if (category === "restaurants") table = "restaurants";
        if (category === "stays") table = "stays";

        const res = await axios.get(
          `${API}/api/stayfood/${table}?districtId=${districtId}`
        );

        setData(res.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, [category, districtId]);

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Category Tabs */}
      <div className="flex gap-6 mb-8 justify-center">

        <button
          onClick={() => setCategory("food")}
          className={`px-5 py-2 rounded-lg ${
            category === "food"
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Popular Foods
        </button>

        <button
          onClick={() => setCategory("restaurants")}
          className={`px-5 py-2 rounded-lg ${
            category === "restaurants"
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Restaurants
        </button>

        <button
          onClick={() => setCategory("stays")}
          className={`px-5 py-2 rounded-lg ${
            category === "stays"
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Stays
        </button>

      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {data.map((item) => (
          <div
            key={item.food_place_id || item.restaurant_id || item.stay_id}
            className="border rounded-xl overflow-hidden shadow"
          >

            <img
              src={item.image_url}
              alt={item.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">

              <h3 className="font-bold text-lg">{item.name}</h3>

              <p className="text-gray-500 text-sm">{item.address}</p>

              <p className="mt-2 text-yellow-600">
                ⭐ {item.rating}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}