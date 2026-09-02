import React from "react";

const TravelReelsHero = () => {
  const scrollToReels = () => {
    document
      .getElementById("travel-reels")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section className="reels-hero">

      <div className="hero-background" />

      <div className="hero-content">

        <div className="hero-badge">
          <span className="hero-dot" />
          KARNATAKA TRAVEL
        </div>

        <h1>
          Discover
          <span>Karnataka</span>
          Through Reels
        </h1>

        <p>
          Explore the beauty of Karnataka through short travel
          videos shared by travellers. Discover districts,
          destinations, culture and unforgettable experiences.
        </p>

        <div className="hero-actions">

          <button
            onClick={scrollToReels}
            className="primary-hero-button"
          >
            Explore Reels
            <span>→</span>
          </button>

          <button className="secondary-hero-button">
            + Share Your Journey
          </button>

        </div>

        <div className="hero-stats">

          <div>
            <strong>31+</strong>
            <span>Districts</span>
          </div>

          <div>
            <strong>100+</strong>
            <span>Destinations</span>
          </div>

          <div>
            <strong>∞</strong>
            <span>Experiences</span>
          </div>

        </div>

      </div>

      <div className="hero-scroll">
        <span>Scroll to explore</span>
        <div className="scroll-line" />
      </div>

    </section>
  );
};

export default TravelReelsHero;