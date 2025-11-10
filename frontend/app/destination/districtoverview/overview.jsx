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
      <div className=" mt-40 max-w-4xl ml-20 mr-20">
        <BlurText
          text={districtdata.name}
          className="text-4xl font-bold text-center"
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
        <p className="text-lg text-gray-700">{districtdata.description}</p>
      </div>

      {/* District image */}
      <div className="mr-20 ml-20">
        <Picture districtName={districtdata.name} />
      </div>

      {/* Chatbot stays here for district tab */}
      <Chatbot />

      {/* Explore places */}
      <div className="mt-10 ml-20">
        <h1 className="text-4xl font-bold">Explore the Places</h1>
        <div>“Filter your journey — pick what excites you most!”</div>
        <Category districtId={districtdata.id} districtName={ districtdata.name } />
      </div>
    </>
  );
};

export default DistrictOverview;
