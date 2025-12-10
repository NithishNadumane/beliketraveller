"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularGallery from "../designcomp/circulargaller"; // local component

const Picture = ({ districtName }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/images/${districtName}`
        );
        setImages(res.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    if (districtName) fetchImages();
  }, [districtName]);

  return (
    <div className="w-full flex justify-center my-6">
      <CircularGallery
        items={images.map((item) => ({
          id: item.media_id,
          image: item.media_url,
          text: item.place_name,
        }))}
        radius={180}
        autoRotate={true}
        rotationSpeed={0.5}
        showTitles={true}
        itemWidth={160}
        itemHeight={160}
        borderRadius={15}
      />
    </div>
  );
};

export default Picture;
