"use client";

import React, { useState } from "react";

const TravelReelCard = ({ reel }) => {

  const [liked, setLiked] = useState(false);


  return (

    <article className="travel-reel-card">


      {/* ==========================================
          VIDEO
      ========================================== */}

      <div className="reel-media">

        <video
          className="reel-video"
          src={reel.video_url}
          poster={reel.thumbnail_url || undefined}
          controls
          playsInline
          preload="metadata"
        />


        {/* LOCATION */}

        <div className="reel-location-badge">

          <span>📍</span>

          {reel.place_name ||
            reel.district_name}

        </div>


        <div className="reel-top-gradient" />

        <div className="reel-bottom-gradient" />

      </div>


      {/* ==========================================
          CONTENT
      ========================================== */}

      <div className="reel-card-content">


        {/* DISTRICT */}

        <div className="reel-district">

          {reel.district_name}

        </div>


        {/* TITLE */}

        <h3>
          {reel.title}
        </h3>


        {/* DESCRIPTION */}

        <p>
          {reel.description}
        </p>


        {/* CREATOR */}

        <div className="reel-creator">

          <div className="creator-avatar">

            U

          </div>

          <div>

            <span className="creator-label">
              Posted by
            </span>

            <strong>
              Traveller
            </strong>

          </div>

        </div>


        {/* ACTIONS */}

        <div className="reel-actions">


          {/* LIKE */}

          <button
            onClick={() =>
              setLiked(!liked)
            }
            className={
              liked
                ? "reel-action liked"
                : "reel-action"
            }
          >

            <span>
              {liked ? "❤️" : "♡"}
            </span>

            {liked ? 1 : 0}

          </button>


          {/* COMMENTS */}

          <button className="reel-action">

            <span>
              💬
            </span>

            0

          </button>


          {/* SHARE */}

          <button
            className="reel-action share"
            onClick={() => {

              if (navigator.share) {

                navigator.share({
                  title: reel.title,
                  text: reel.description,
                  url: window.location.href,
                });

              }

            }}
          >

            <span>
              ↗
            </span>

            Share

          </button>


        </div>

      </div>

    </article>

  );
};

export default TravelReelCard;