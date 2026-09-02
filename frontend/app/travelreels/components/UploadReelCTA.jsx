"use client";

import React, { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;
import "./travelreels.css"; 

const UploadReelCTA = () => {
  const [showForm, setShowForm] = useState(false);

  // =====================================================
  // FORM STATES
  // =====================================================

  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [reelType, setReelType] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [placeId, setPlaceId] = useState("");

  // =====================================================
  // DATA
  // =====================================================

  const [districts, setDistricts] = useState([]);
  const [places, setPlaces] = useState([]);

  // =====================================================
  // LOADING STATES
  // =====================================================

  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [uploading, setUploading] = useState(false);

  // =====================================================
  // MESSAGE STATES
  // =====================================================

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // OPEN FORM
  // LOGIN REQUIRED
  // =====================================================

  const openForm = () => {
    setError("");
    setMessage("");

    // Get JWT token
    const token = localStorage.getItem("token");

    // User is not logged in
    if (!token) {
      setError("Please login to upload a travel reel.");
      return;
    }

    // User is logged in
    setShowForm(true);
  };

  // =====================================================
  // CLOSE FORM
  // =====================================================

  const closeForm = () => {
    if (uploading) return;

    setShowForm(false);
    setError("");
    setMessage("");
  };

  // =====================================================
  // GET ALL DISTRICTS
  // =====================================================

  useEffect(() => {
    if (!showForm) return;

    const fetchDistricts = async () => {
      try {
        setLoadingDistricts(true);
        setError("");

        const response = await fetch(
          `${API}/api/districts`
        );

        if (!response.ok) {
          throw new Error("Failed to load districts");
        }

        const data = await response.json();

        setDistricts(data);

      } catch (err) {
        console.error(
          "District fetch error:",
          err
        );

        setError(
          "Unable to load Karnataka districts."
        );

      } finally {
        setLoadingDistricts(false);
      }
    };

    fetchDistricts();

  }, [showForm]);

  // =====================================================
  // GET PLACES BY DISTRICT
  // =====================================================

  useEffect(() => {

    if (!districtId) {
      setPlaces([]);
      setPlaceId("");
      return;
    }

    const fetchPlaces = async () => {

      try {

        setLoadingPlaces(true);
        setError("");

        /*
          IMPORTANT:

          This URL must match your backend route.

          If your route is:

          router.get("/:places", getplace);

          then use:

          /api/places/${districtId}

          NOT:

          /api/places/district/${districtId}
        */

        const response = await fetch(
          `${API}/api/places/district/${districtId}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load places"
          );
        }

        const data = await response.json();

        setPlaces(data);

      } catch (err) {

        console.error(
          "Place fetch error:",
          err
        );

        setPlaces([]);

        setError(
          "Unable to load places for this district."
        );

      } finally {

        setLoadingPlaces(false);

      }
    };

    fetchPlaces();

  }, [districtId]);

  // =====================================================
  // VIDEO SELECT
  // =====================================================

  const handleVideoChange = (e) => {

    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setVideo(null);
      return;
    }

    // Only video files
    if (!selectedFile.type.startsWith("video/")) {

      setError(
        "Please select a valid video file."
      );

      setVideo(null);
      return;
    }

    // 100 MB limit
    if (
      selectedFile.size >
      100 * 1024 * 1024
    ) {

      setError(
        "Video size must be less than 100 MB."
      );

      setVideo(null);
      return;
    }

    setError("");
    setVideo(selectedFile);
  };

  // =====================================================
  // DISTRICT CHANGE
  // =====================================================

  const handleDistrictChange = (e) => {

    const selectedDistrictId =
      e.target.value;

    setDistrictId(
      selectedDistrictId
    );

    // Reset place
    setPlaceId("");
    setPlaces([]);
  };

  // =====================================================
  // REEL TYPE CHANGE
  // =====================================================

  const handleReelTypeChange = (type) => {

    setReelType(type);

    /*
      If district reel,
      there is no place_id.
    */

    if (type === "district") {
      setPlaceId("");
    }
  };

  // =====================================================
  // UPLOAD REEL
  // =====================================================

  const handleUpload = async (e) => {

    e.preventDefault();

    setError("");
    setMessage("");

    // ===================================================
    // VALIDATION
    // ===================================================

    if (!video) {

      setError(
        "Please select a travel video."
      );

      return;
    }

    if (!reelType) {

      setError(
        "Please select what the reel is about."
      );

      return;
    }

    if (!districtId) {

      setError(
        "Please select a district."
      );

      return;
    }

    if (!title.trim()) {

      setError(
        "Please enter a title."
      );

      return;
    }

    /*
      Place is compulsory only
      when reel_type = place.
    */

    if (
      reelType === "place" &&
      !placeId
    ) {

      setError(
        "Please select the specific place."
      );

      return;
    }

    // ===================================================
    // GET JWT TOKEN
    // ===================================================

    const token =
      localStorage.getItem("token");

    if (!token) {

      setError(
        "Your login session has expired. Please login again."
      );

      return;
    }

    try {

      setUploading(true);

      // =================================================
      // CREATE FORM DATA
      // =================================================

      const formData =
        new FormData();

      formData.append(
        "video",
        video
      );

      formData.append(
        "title",
        title.trim()
      );

      formData.append(
        "description",
        description.trim()
      );

      formData.append(
        "district_id",
        districtId
      );

      formData.append(
        "reel_type",
        reelType
      );

      /*
        IMPORTANT:

        We DO NOT send user_id.

        The backend gets user_id
        from JWT:

        req.user.id
      */

      if (reelType === "place") {

        formData.append(
          "place_id",
          placeId
        );

      }

      // =================================================
      // SEND REQUEST
      // =================================================

      const response = await fetch(
        `${API}/api/travelreels`,
        {
          method: "POST",

          headers: {
            /*
              JWT authentication

              Backend authmiddleware.js
              reads this header.
            */

            Authorization:
              `Bearer ${token}`,
          },

          /*
            DO NOT set Content-Type manually.

            Browser automatically creates:

            multipart/form-data
            + boundary
          */

          body: formData,
        }
      );

      const data =
        await response.json();

      // =================================================
      // BACKEND ERROR
      // =================================================

      if (!response.ok) {

  /*
    Token expired
  */

  if (response.status === 401) {

    localStorage.removeItem("token");

    setError(
      "Your login session has expired. Please login again."
    );

    return;
  }


  /*
    AI TRAVEL VIDEO REJECTION

    Backend rejects the video when:
    isTravel !== true
    OR
    confidence < 0.80
  */

  if (response.status === 400) {

    setError(
      data.error ||
      "Only travel-related reels are allowed. Please upload a travel video."
    );

    return;
  }


  /*
    Other backend errors
  */

  throw new Error(
    data.error ||
    data.message ||
    "Failed to upload travel reel"
  );
}

      // =================================================
      // SUCCESS
      // =================================================

      setMessage(
        "Travel reel uploaded successfully! It will appear after approval."
      );

      // =================================================
      // RESET FORM
      // =================================================

      setVideo(null);
      setTitle("");
      setDescription("");
      setReelType("");
      setDistrictId("");
      setPlaceId("");
      setPlaces([]);

      // =================================================
      // RESET FILE INPUT
      // =================================================

      const fileInput =
        document.getElementById(
          "travel-reel-video"
        );

      if (fileInput) {
        fileInput.value = "";
      }

    } catch (err) {

      console.error(
        "Travel reel upload error:",
        err
      );

      setError(
        err.message ||
        "Something went wrong while uploading."
      );

    } finally {

      setUploading(false);

    }
  };

  // =====================================================
  // JSX
  // =====================================================

  return (
    <>

      {/* =================================================
          UPLOAD CTA
      ================================================= */}

      <section className="upload-section">

        <div className="upload-pattern" />

        <div className="upload-content">

          <div className="upload-icon">
            🎥
          </div>

          <span className="section-label">
            SHARE YOUR EXPERIENCE
          </span>

          <h2>
            Have a Karnataka travel story?
          </h2>

          <p>
            Share your favourite destination,
            hidden gem, food experience or
            adventure with fellow travellers.
          </p>

          <button
            className="upload-button"
            onClick={openForm}
          >
            <span>＋</span>

            Upload Travel Reel
          </button>

          {/* LOGIN ERROR */}

          {error && !showForm && (

            <div className="upload-error">
              {error}
            </div>

          )}

        </div>

      </section>


      {/* =================================================
          UPLOAD MODAL
      ================================================= */}

      {showForm && (

        <div className="upload-modal-overlay">

          <div className="upload-modal">

            {/* =================================================
                CLOSE
            ================================================= */}

            <button
              className="upload-modal-close"
              onClick={closeForm}
              disabled={uploading}
            >
              ×
            </button>


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="upload-modal-header">

              <span className="section-label">
                SHARE YOUR JOURNEY
              </span>

              <h2>
                Upload Travel Reel
              </h2>

              <p>
                Share a travel experience
                from Karnataka.
              </p>

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleUpload}
              className="upload-form"
            >

              {/* =================================================
                  VIDEO
              ================================================= */}

              <div className="form-group">

                <label>
                  Travel Video
                </label>

                <input
                  id="travel-reel-video"
                  type="file"
                  accept="video/*"
                  onChange={
                    handleVideoChange
                  }
                  disabled={uploading}
                />

                {video && (

                  <div className="selected-video">
                    🎥 {video.name}
                  </div>

                )}

              </div>


              {/* =================================================
                  REEL TYPE
              ================================================= */}

              <div className="form-group">

                <label>
                  What is this reel about?
                </label>

                <div className="reel-type-options">

                  {/* DISTRICT */}

                  <label
                    className={
                      reelType === "district"
                        ? "reel-type-card selected"
                        : "reel-type-card"
                    }
                  >

                    <input
                      type="radio"
                      name="reelType"
                      value="district"
                      checked={
                        reelType ===
                        "district"
                      }
                      onChange={() =>
                        handleReelTypeChange(
                          "district"
                        )
                      }
                    />

                    <div>

                      <strong>
                        🗺️ District
                      </strong>

                      <span>
                        About the whole district
                      </span>

                    </div>

                  </label>


                  {/* PLACE */}

                  <label
                    className={
                      reelType === "place"
                        ? "reel-type-card selected"
                        : "reel-type-card"
                    }
                  >

                    <input
                      type="radio"
                      name="reelType"
                      value="place"
                      checked={
                        reelType ===
                        "place"
                      }
                      onChange={() =>
                        handleReelTypeChange(
                          "place"
                        )
                      }
                    />

                    <div>

                      <strong>
                        📍 Specific Place
                      </strong>

                      <span>
                        About a particular place
                      </span>

                    </div>

                  </label>

                </div>

              </div>


              {/* =================================================
                  DISTRICT
              ================================================= */}

              <div className="form-group">

                <label>
                  Karnataka District
                </label>

                <select
                  value={districtId}
                  onChange={
                    handleDistrictChange
                  }
                  disabled={
                    loadingDistricts ||
                    uploading
                  }
                >

                  <option value="">

                    {loadingDistricts
                      ? "Loading districts..."
                      : "Select District"}

                  </option>

                  {districts.map(
                    (district) => (

                      <option
                        key={district.id}
                        value={district.id}
                      >
                        {district.name}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* =================================================
                  PLACE
              ================================================= */}

              {reelType === "place" && (

                <div className="form-group">

                  <label>
                    Specific Place
                  </label>

                  <select
                    value={placeId}
                    onChange={(e) =>
                      setPlaceId(
                        e.target.value
                      )
                    }
                    disabled={
                      !districtId ||
                      loadingPlaces ||
                      uploading
                    }
                  >

                    <option value="">

                      {!districtId
                        ? "Select district first"
                        : loadingPlaces
                        ? "Loading places..."
                        : "Select Place"}

                    </option>

                    {places.map(
                      (place) => (

                        <option
                          key={place.id}
                          value={place.id}
                        >
                          {place.name}
                        </option>

                      )
                    )}

                  </select>

                </div>

              )}


              {/* =================================================
                  TITLE
              ================================================= */}

              <div className="form-group">

                <label>
                  Title
                </label>

                <input
                  type="text"
                  placeholder="Example: Exploring Mysore Palace"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  disabled={uploading}
                />

              </div>


              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  placeholder="Tell us about your travel experience..."
                  rows="4"
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  disabled={uploading}
                />

              </div>


              {/* =================================================
                  ERROR
              ================================================= */}

              {error && (

                <div className="upload-error">
                  {error}
                </div>

              )}


              {/* =================================================
                  SUCCESS
              ================================================= */}

              {message && (

                <div className="upload-success">
                  {message}
                </div>

              )}


              {/* =================================================
                  SUBMIT
              ================================================= */}

              <button
                type="submit"
                className="upload-submit-button"
                disabled={uploading}
              >

                {uploading
                  ? "Uploading..."
                  : "Upload Travel Reel"}

              </button>

            </form>

          </div>

        </div>

      )}

    </>
  );
};

export default UploadReelCTA;