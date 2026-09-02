import React from "react";

const EmptyReels = ({ district }) => {

  return (

    <div className="empty-reels">

      <div className="empty-icon">
        🎥
      </div>

      <h3>
        No reels yet
      </h3>

      <p>

        We don't have any travel reels from{" "}

        <strong>
          {district}
        </strong>

        {" "}yet.

        Be the first traveller to share one!

      </p>


      <button className="empty-button">

        Share Your Reel

      </button>

    </div>

  );

};

export default EmptyReels;