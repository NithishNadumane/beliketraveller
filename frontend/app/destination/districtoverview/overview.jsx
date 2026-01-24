"use client";
import React from "react";
import BlurText from "../designcomp/districtname";
import Picture from "../component/picture";
import Chatbot from "../component/chatbot";
import Category from "../component/category";

const DistrictOverview = ({ districtdata }) => {
  return (
    <>
      {/* District header section */}
      <div className="mt-[150px] sm:mt-32 lg:mt-40 max-w-4xl mx-4 sm:mx-10 lg:ml-20 lg:mr-20">
        <BlurText
          text={districtdata.name}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />

        <p className="text-sm sm:text-base lg:text-lg text-gray-700">
          {districtdata.description}
        </p>
      </div>

      {/* District image */}
      <div className="mx-4 sm:mx-10 lg:ml-20 lg:mr-20">
        <Picture districtName={districtdata.name} />
      </div>

      {/* Chatbot */}
      <Chatbot />

      {/* Explore places */}
      <div className="mt-6 sm:mt-8 lg:mt-10 mx-4 sm:mx-10 lg:ml-20">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Explore the Places
        </h1>

        <div className="text-sm sm:text-base">
          “Filter your journey — pick what excites you most!”
        </div>

        <Category
          districtId={districtdata.id}
          districtName={districtdata.name}
        />
      </div>
    </>
  );
};

export default DistrictOverview;