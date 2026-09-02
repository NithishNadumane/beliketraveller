"use client";

import React, { useEffect, useState } from "react";

import TravelReelsHero from "./components/TravelReelsHero";
import DistrictFilter from "./components/DistrictFilter";
import TravelReelGrid from "./components/TravelReelGrid";
import UploadReelCTA from "./components/UploadReelCTA";

import "./components/travelreels.css";

const Page = () => {

  const [reels, setReels] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const API = process.env.NEXT_PUBLIC_API_URL;

  /* =====================================================
     FETCH TRAVEL REELS
  ===================================================== */

  useEffect(() => {

    const fetchTravelReels = async () => {

      try {

        setLoading(true);

        const response = await fetch(
          `${API}/api/travelreels`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch travel reels");
        }

        const data = await response.json();

        setReels(data);


        /* ===============================================
           GET UNIQUE DISTRICTS FROM REELS
        =============================================== */

        const uniqueDistricts = [
          ...new Map(
            data.map((reel) => [
              reel.district_id,
              {
                id: reel.district_id,
                name: reel.district_name,
              },
            ])
          ).values(),
        ];

        setDistricts(uniqueDistricts);

      } catch (error) {

        console.error(
          "Travel reels fetch error:",
          error
        );

        setError(
          "Unable to load travel reels."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchTravelReels();

  }, []);


  /* =====================================================
     FILTER REELS
  ===================================================== */

  const filteredReels =
    selectedDistrict === "All"
      ? reels
      : reels.filter(
          (reel) =>
            reel.district_id === selectedDistrict
        );


  return (
    <main className="travel-reels-page">

      {/* HERO */}

      <TravelReelsHero />


      {/* DISTRICT FILTER */}

      <DistrictFilter
        districts={districts}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
      />


      {/* ERROR */}

      {error && (

        <div className="reels-error">
          {error}
        </div>

      )}


      {/* LOADING */}

      {loading ? (

        <section className="reels-section">

          <div className="section-container">

            <div className="reels-loading">

              <div className="loading-spinner" />

              <p>
                Loading travel experiences...
              </p>

            </div>

          </div>

        </section>

      ) : (

        /* REELS */

        <TravelReelGrid
          reels={filteredReels}
          selectedDistrict={selectedDistrict}
        />

      )}


      {/* UPLOAD */}

      <UploadReelCTA />

    </main>
  );
};

export default Page;