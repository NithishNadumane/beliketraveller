import React from "react";

const DistrictFilter = ({
  districts,
  selectedDistrict,
  setSelectedDistrict,
}) => {

  return (

    <section className="district-filter">

      <div className="section-container">

        <div className="filter-header">

          <div>

            <span className="section-label">
              EXPLORE BY LOCATION
            </span>

            <h2>
              Karnataka Districts
            </h2>

          </div>

          <p>
            Discover travel experiences from
            across Karnataka.
          </p>

        </div>


        <div className="district-list">

          {/* ALL */}

          <button
            onClick={() =>
              setSelectedDistrict("All")
            }
            className={
              selectedDistrict === "All"
                ? "district-pill active"
                : "district-pill"
            }
          >
            All
          </button>


          {/* DISTRICTS */}

          {districts.map((district) => (

            <button
              key={district.id}
              onClick={() =>
                setSelectedDistrict(district.id)
              }
              className={
                selectedDistrict === district.id
                  ? "district-pill active"
                  : "district-pill"
              }
            >
              {district.name}
            </button>

          ))}

        </div>

      </div>

    </section>

  );
};

export default DistrictFilter;