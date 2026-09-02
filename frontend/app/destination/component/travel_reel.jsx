"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Travelreel = ({ districtId, placeId, reelType }) => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchReels = async () => {
      try {
        setLoading(true);

        let url = "";

        if (reelType === "district" && districtId) {
          url = `${API}/api/travelreels/district/${districtId}`;
        } else if (reelType === "place" && placeId) {
          url = `${API}/api/travelreels/place/${placeId}`;
        } else {
          setLoading(false);
          return;
        }

        const response = await axios.get(url);

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        setReels(data);
      } catch (error) {
        console.error(
          "Travel reel error:",
          error.response?.data || error.message
        );

        setReels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, [districtId, placeId, reelType, API]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="mt-12 px-4 sm:px-8 lg:px-16 xl:px-20">
        <div className="mb-6">
          <div className="h-8 w-52 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 w-72 bg-gray-100 rounded mt-3 animate-pulse" />
        </div>

        <div className="flex gap-5 overflow-hidden">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex-shrink-0 w-[220px] sm:w-[240px] md:w-[260px] h-[440px] bg-gray-200 rounded-3xl animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  // =========================
  // NO REELS
  // =========================

  if (reels.length === 0) {
    return (
      <section className="mt-12 px-4 sm:px-8 lg:px-16 xl:px-20">
        <div className="rounded-3xl bg-gray-50 border border-gray-200 p-8 text-center">
          <div className="text-4xl mb-3">🎬</div>

          <h2 className="text-xl font-bold text-gray-800">
            No reels available
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            There are no travel reels for this{" "}
            {reelType === "district" ? "district" : "place"} yet.
          </p>
        </div>
      </section>
    );
  }

  // =========================
  // MAIN UI
  // =========================

  return (
    <section className="mt-12 sm:mt-16 px-4 sm:px-8 lg:px-16 xl:px-20 pb-12">

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex items-end justify-between mb-6">

        <div>
          <div className="flex items-center gap-3">

            <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-purple-500 to-pink-500" />

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              {reelType === "district"
                ? "District Reels"
                : "Place Reels"}
            </h2>

          </div>

          <p className="text-sm sm:text-base text-gray-500 mt-2 ml-4">
            {reelType === "district"
              ? "Discover the district through short videos"
              : "Explore this place through short videos"}
          </p>
        </div>

        {/* Reel count */}

        <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
          <span className="text-sm font-semibold text-gray-700">
            {reels.length}
          </span>

          <span className="text-sm text-gray-500">
            {reels.length === 1 ? "Reel" : "Reels"}
          </span>
        </div>

      </div>

      {/* =========================
          REELS CONTAINER
      ========================= */}

      <div
        className="
          flex gap-4 sm:gap-5
          overflow-x-auto
          pb-5
          snap-x snap-mandatory
          scrollbar-thin
          scrollbar-thumb-gray-300
          scrollbar-track-transparent
        "
      >

        {reels.map((reel) => (

          <div
            key={reel.id}
            className="
              group
              relative
              flex-shrink-0
              snap-start
              w-[220px]
              sm:w-[240px]
              md:w-[260px]
              lg:w-[270px]
              h-[440px]
              sm:h-[460px]
              rounded-3xl
              overflow-hidden
              bg-black
              shadow-lg
              hover:shadow-2xl
              transition-all
              duration-300
              hover:-translate-y-1
            "
          >

            {/* =========================
                VIDEO
            ========================= */}

            <video
              src={reel.video_url}
              controls
              preload="metadata"
              playsInline
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />

            {/* =========================
                DARK GRADIENT
            ========================= */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/90
                via-black/20
                to-transparent
                pointer-events-none
              "
            />

            {/* =========================
                TOP BADGE
            ========================= */}

            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">

              <span
                className={`
                  px-3 py-1.5
                  rounded-full
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-wide
                  backdrop-blur-md
                  border
                  ${
                    reel.reel_type === "district"
                      ? "bg-purple-500/80 text-white border-purple-300/30"
                      : "bg-pink-500/80 text-white border-pink-300/30"
                  }
                `}
              >
                {reel.reel_type === "district"
                  ? "District"
                  : "Place"}
              </span>

              <span
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-black/40
                  backdrop-blur-md
                  flex
                  items-center
                  justify-center
                  text-white
                  text-sm
                "
              >
                ▶
              </span>

            </div>

            {/* =========================
                BOTTOM DETAILS
            ========================= */}

            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">

              {/* Title */}

              <h3 className="text-lg sm:text-xl font-bold leading-tight line-clamp-2 drop-shadow-md">
                {reel.title}
              </h3>

              {/* Location */}

              <div className="mt-2 space-y-1">

                {reel.district_name && (
                  <p className="text-xs sm:text-sm text-white/85">
                    📍 {reel.district_name}
                  </p>
                )}

                {reel.reel_type === "place" &&
                  reel.place_name && (
                    <p className="text-xs sm:text-sm text-white/85">
                      📌 {reel.place_name}
                    </p>
                  )}

              </div>

              {/* Description */}

              {reel.description && (
                <p className="text-xs sm:text-sm text-white/70 mt-2 line-clamp-2">
                  {reel.description}
                </p>
              )}

              {/* Likes */}

              <div className="flex items-center gap-2 mt-4">

                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                  <span>❤️</span>

                  <span className="text-xs font-semibold">
                    {reel.likes || 0}
                  </span>
                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* =========================
          SCROLL HINT
      ========================= */}

      {reels.length > 3 && (
        <div className="flex justify-center mt-3">

          <p className="text-xs text-gray-400">
            ← Swipe to explore more reels →
          </p>

        </div>
      )}

    </section>
  );
};

export default Travelreel;