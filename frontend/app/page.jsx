// app/page.js
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import Middle1 from "./components/Middle1";
export default function HomePage() {
  return (<>
   
    <main className="min-h-screen flex flex-col">
       <Navbar/>
      <Middle1/>

      {/* Highlights Grid */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">
          Start Your Journey
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/destinations"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">Top Districts</h3>
            <p>Find the top 10 places to visit in each district of Karnataka.</p>
          </Link>

          <Link
            href="/eco-tourism"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">Eco Tourism</h3>
            <p>
              Explore eco-friendly travel experiences and sustainable practices.
            </p>
          </Link>

          <Link
            href="/ai-assistant"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">AI Travel Assistant</h3>
            <p>
              Get AI-powered recommendations for trips, stays, and activities.
            </p>
          </Link>

          <Link
            href="/hotels"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">Hotels & Stays</h3>
            <p>
              Find the best hotels, homestays, and restaurants across Karnataka.
            </p>
          </Link>

          <Link
            href="/rentals"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">Rentals</h3>
            <p>Book affordable bike & car rentals for your next adventure.</p>
          </Link>

          <Link
            href="/reviews"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">Reviews</h3>
            <p>Read reviews from travellers and share your own experiences.</p>
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to explore Karnataka?
        </h2>
        <Link
          href="/auth/signup"
          className="px-8 py-3 bg-white text-green-700 font-semibold rounded-xl shadow hover:bg-gray-100"
        >
          Join Be Like Traveller
        </Link>
      </section>
    </main>
    <Footer/>
  </>);
}
