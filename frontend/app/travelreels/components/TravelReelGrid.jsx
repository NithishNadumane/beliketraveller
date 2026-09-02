import React from "react";

import TravelReelCard from "./TravelReelCard";
import EmptyReels from "./EmptyReels";

const TravelReelGrid = ({
  reels,
  selectedDistrict,
}) => {

  const districtName =
    reels.length > 0
      ? reels[0].district_name
      : null;


  return (

    <section
      id="travel-reels"
      className="reels-section"
    >

      <div className="section-container">

        <div className="reels-heading">

          <div>

            <span className="section-label">
              TRAVEL EXPERIENCES
            </span>

            <h2>

              {selectedDistrict === "All"
                ? "Latest Karnataka Reels"
                : districtName
                  ? `${districtName} Reels`
                  : "Travel Reels"
              }

            </h2>

            <p>
              Real experiences. Beautiful places.
              One Karnataka.
            </p>

          </div>


          <div className="reel-count">

            <strong>
              {reels.length}
            </strong>

            <span>
              Reels
            </span>

          </div>

        </div>


        {reels.length > 0 ? (

          <div className="reels-grid">

            {reels.map((reel) => (

              <TravelReelCard
                key={reel.id}
                reel={reel}
              />

            ))}

          </div>

        ) : (

          <EmptyReels
            district={
              selectedDistrict === "All"
                ? "Karnataka"
                : "this district"
            }
          />

        )}

      </div>

    </section>

  );
};

export default TravelReelGrid;