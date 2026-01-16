"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../component/navbar";
import Rentals from "../../rentals/rentals";
// import Overview from "../districtoverview/overview"; 
// import Hotels from "../component/hotels";
import PlaceOverview from "../../districtoverview/place"; // 👈 You can rename this to your place overview component

export default function PlacePage() {
  const { district, places } = useParams();
  const [placedata, setPlacedata] = useState(null);
  const [districtdata, setDistrictdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("district");
  const API = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    async function fetchPlaceAndDistrict() {
      try {
        // ✅ Fetch place data
        const placeRes = await axios.get(`${API}/api/places/${places}`);
        setPlacedata(placeRes.data);

        // ✅ Fetch district data for other tabs (rental, agency, hotel)
        const districtRes = await axios.get(`${API}/api/districts/${district}`);
        setDistrictdata(districtRes.data);
      } catch (error) {
        console.error("Error fetching place/district:", error);
      } finally {
        setLoading(false);
      }
    }

    if (district && places) fetchPlaceAndDistrict();
  }, [district, places]);

  if (loading) return <p className="mt-32 text-center">Loading...</p>;
  if (!placedata) return <p className="mt-32 text-center">Place not found</p>;

  return (
    <div>
      {/* ✅ Reuse Navbar exactly like in District Page */}
      <Navbar
        districtName={districtdata?.name || district}
        districtid={districtdata?.id}
        onTabChange={setActiveTab}
        activeTab={activeTab}
      />

      {/* ✅ Render based on tab selection */}
      <div className="pt-32">
        {/* 🔹 Place info under 'district' tab */}
        {activeTab === "district" && <PlaceOverview placedata={placedata} />}

        {/* 🔹 Rentals related to this place */}
        {activeTab === "rental" && (
          <Rentals districtId={districtdata?.id} placeId={placedata?.id} />
        )}

        {/* 🔹 Travel Agencies related to this place */}
        {activeTab === "agency" && (
          <TravelAgency districtId={districtdata?.id} placeId={placedata?.id} />
        )}

        {/* 🔹 Hotels related to this place */}
        {activeTab === "hotel" && (
          <Hotels districtId={districtdata?.id} placeId={placedata?.id} />
        )}
      </div>
    </div>
  );
}
