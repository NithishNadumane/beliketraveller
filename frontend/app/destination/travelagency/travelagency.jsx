import React, { useEffect, useState } from "react";
import axios from "axios";

const TravelAgency = ({ districtId }) => {
   const API = process.env.NEXT_PUBLIC_API_URL;
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API}/api/travelagencies/${districtId}`
      );
      setAgencies(response.data);
    } catch (err) {
      console.log("error message is ", err.message);
      setError("Failed to get data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (districtId) {
      fetchData();
    }
  }, [districtId]);

  if (loading) {
    return <p className="text-center mt-10">Loading agencies...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto p-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
        Travel Agencies
        </h2>
        <div >
          {agencies.map((agency) => (
            <div
              key={agency.id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition flex gap-6 p-5 items-center mt-4"
            >
                 <img
              src={agency.logo_url || "/travel.jpg"}
              alt={agency.agency_name}
              className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">
                {agency.agency_name}
              </h3>

              <p className="text-yellow-500 mt-1 text-sm">
                ⭐ {agency.rating} ({agency.total_reviews} reviews)
              </p>

              <p className="text-gray-600 mt-2 text-sm">
                📍 {agency.address}
              </p>

              <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                {agency.description}
              </p>
              </div>
               <div className="text-right">
              <p className="text-gray-500 text-sm mb-2">Contact</p>

              <div className="flex flex-col gap-2 items-end">
                <a
                  href={`tel:${agency.phone}`}
                  className="text-white bg-black px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm"
                >
                  📞 {agency.phone}
                </a>

                <a
                  href={agency.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline hover:text-blue-800"
                >
                  🌐 Visit Website
                </a>
              </div>
            </div>
            </div>))}
        </div>


      </div>
    </>
  );
};

export default TravelAgency;