import React, { useEffect, useState } from "react";
import axios from "axios";

const Rentals = ({ districtId }) => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRentals = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/rentals/${districtId}`
      );
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
      <div className="flex items-center justify-center text-gray-500">
        Loading rentals...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  const twoWheelers = rentals.filter((r) => r.type.includes("2"));
  const fourWheelers = rentals.filter((r) => r.type.includes("4"));

  const Card = ({ item }) => (
    <a
      href={item.external_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-black border border-gray-800 rounded-2xl 
      hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)]
      transition duration-300 overflow-hidden"
    >
      {/* Yellow Accent Line */}
      <div className="h-1 bg-yellow-400"></div>

      {/* Image */}
      <div className="bg-gray-900 flex items-center justify-center p-6">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-40 object-contain group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition">
          {item.name}
        </h3>

        <p className="text-gray-400 text-sm mt-2">
          {item.description}
        </p>

        <button className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-500 transition">
          Visit Website →
        </button>
      </div>
    </a>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Rentals</h1>

      {/* Two Wheelers */}
      <section className="mb-12">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold bg-yellow-400 text-black px-4 py-2 inline-block rounded-lg">
            🛵 Two-Wheelers
          </h2>
        </div>

        {twoWheelers.length === 0 ? (
          <p className="text-gray-500">
            No two-wheeler rentals available in this district.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {twoWheelers.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* Four Wheelers */}
      <section>
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold bg-yellow-400 text-black px-4 py-2 inline-block rounded-lg">
            🚗 Four-Wheelers
          </h2>
        </div>

        {fourWheelers.length === 0 ? (
          <p className="text-gray-500">
            No four-wheeler rentals available in this district.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fourWheelers.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Rentals;