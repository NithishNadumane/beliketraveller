import Image from "next/image"
import "./css/middle1.css"

export default function Middle1() {
  return (
    <section className="heroSection">
      {/* Background Image */}
      <div className="bgWrapper">
        <Image
          src="/fina.png"
          alt="Karnataka Tourism"
          fill
          className="bgImage"
          priority
        />
        <div className="overlay"></div>
      </div>
     
      {/* Centered Search Box + Quote */}
      <div className="heroContent">
        {/* Quote */}
        <h2 className="heroQuote">
          "Discover the beauty and culture of Karnataka"
        </h2>

        <div className="searchBox">
          <input
            type="text"
            placeholder="Search destinations, temples, beaches..."
          />
          <button>Search</button>
        </div>
      </div>
    </section>
  )
}
