  import React, { useEffect, useState } from "react";
  import axios from "axios";

  const Rentals = ({ districtId }) => {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ Fetch rentals using Axios + async/await
    const fetchRentals = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/rentals/${districtId}`);
        setRentals(response.data);
      } catch (err) {
        console.error("Error fetching rentals:", err);
        setError("Failed to load rentals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchRentals();
    }, [districtId]);

    if (loading) {
      return (
        <div className="flex items-center justify-center   text-gray-600">
          Loading rentals...
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-500 mt-10">
          {error}
        </div>
      );
    }

    const twoWheelers = rentals.filter((r) => r.type.includes("2"));
    const fourWheelers = rentals.filter((r) => r.type.includes("4"));

    return (
      <div className="mt-40 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Rentals</h1>

        {/* 🛵 Two-Wheelers */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">🛵 Two-Wheelers</h2>
          {twoWheelers.length === 0 ? (
            <p className="text-gray-500">No two-wheeler rentals available in this district.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {twoWheelers.map((item) => (
                <a
                  key={item.id}
                  href={item.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border rounded-xl shadow-md hover:shadow-lg transition p-4 bg-white"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* 🚗 Four-Wheelers */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">🚗 Four-Wheelers</h2>
          {fourWheelers.length === 0 ? (
            <p className="text-gray-500">No four-wheeler rentals available in this district.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fourWheelers.map((item) => (
                <a
                  key={item.id}
                  href={item.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border rounded-xl shadow-md hover:shadow-lg transition p-4 bg-white"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </a>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  };

  export default Rentals;

