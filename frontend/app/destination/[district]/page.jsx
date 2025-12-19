"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../component/navbar";
import Rentals from "../rentals/rentals";
import Overview from "../districtoverview/overview"; 
// import TravelAgency from "../component/travelagency";
// import Hotels from "../component/hotels";

export default function DistrictPage() {
  const { district } = useParams();
  const [districtdata, setdistrictdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [activeTab, setActiveTab] = useState("district");
    const API = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    async function fetchDistrict() {
      try {
        const res = await axios.get(`${API}/api/districts/${district}`);
        setdistrictdata(res.data);
      } catch (error) {
        console.error("Error fetching district:", error);
      } finally {
        setloading(false);
      }
    }
    if (district) fetchDistrict();
  }, [district]);

  if (loading) return <p className="mt-32 text-center">Loading...</p>;
  if (!districtdata) return <p className="mt-32 text-center">District not found</p>;

  return (
    <div>
      <Navbar
        districtName={districtdata.name}
        districtid={districtdata.id}
        onTabChange={setActiveTab}
        activeTab={activeTab}
      />  

      {/* Render based on tab */}
      <div className="p t-32">
      {activeTab === "district" && <Overview districtdata={districtdata} />}
      {activeTab === "rental" && <Rentals districtId={districtdata.id} />}
      {activeTab === "agency" && <TravelAgency districtId={districtdata.id} />}
      {activeTab === "hotel" && <Hotels districtId={districtdata.id} />}
      </div>
    
    </div>
  );
}
