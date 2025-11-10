"use client"
import Image from "next/image";
import "./css/middle1.css";
import SearchBar from "./searchbar"; // import reusable search bar

export default function Middle1() {
  return (
    <section className="heroSection">
      {/* Background Image */}
      <div className="bgWrapper">
        <Image
          src="/fina.png"
          alt="karnataka background image"
          fill
          className="bgImage"
          priority
        />
        <div className="overlay"></div>
      </div>

      {/* Centered Search Box + Quote */}
      <div className="heroContent">
        <h2 className="heroQuote">
          "Discover the beauty and culture of Karnataka"
        </h2>
        <SearchBar variant="home"/>
      </div>
    </section>
  );
}
