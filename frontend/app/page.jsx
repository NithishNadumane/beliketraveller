// app/page.js
"use client"
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
            href="/travelagency"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
             <img src="https://www.tripinnholiday.com/images/packages/pkg-01-002-02.jpg" alt="Editing Services" className="w-full h-48 object-cover rounded-lg mb-3"/>
            <h3 className="text-xl font-semibold mb-2">Travel agency</h3>
            <p>Book curated travel packages and guided tours with our partner agencies.</p>
          </Link>

          <Link
            href="/editing"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <img src="https://retouchinglabs.com/wp-content/uploads/2023/11/travel-video-editing-service-retouchinglabs-737x628.jpg" alt="Editing Services" className="w-full h-48 object-cover rounded-lg mb-3"/>
            <h3 className="text-xl font-semibold mb-2">Editing Services</h3>
            <p>
                Professional photo and video editing to make your travel memories more
  beautiful and share-worthy.
            </p>
          </Link>

          <Link
            href="/ai-assistant"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
             <img src="http://artificial-intelligence.in/wp-content/uploads/2024/01/Chatbots-and-Virtual-Assistants-The-AI-in-Your-Pocket-2024.jpg" alt="Editing Services" className="w-full h-48 object-cover rounded-lg mb-3"/>
            <h3 className="text-xl font-semibold mb-2">AI Travel Assistant</h3>
            <p>
              Get AI-powered recommendations for trips, stays, and activities.
            </p>
          </Link>

          <Link
            href="/hotels"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
             <img src="https://cdn.pixabay.com/photo/2014/05/16/04/13/log-huts-345360_960_720.jpg" alt="Editing Services" className="w-full h-48 object-cover rounded-lg mb-3"/>
            <h3 className="text-xl font-semibold mb-2">Hotels & Stays</h3>
            <p>
              Find the best hotels, homestays, and restaurants across Karnataka.
            </p>
          </Link>

          <Link
            href="/rentals"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
             <img src="https://manalimotorbikerental.com/wp-content/uploads/2022/12/Manali-motot-bike-rental.jpg" alt="Editing Services" className="w-full h-48 object-cover rounded-lg mb-3"/>
            <h3 className="text-xl font-semibold mb-2">Rentals</h3>
            <p>Book affordable bike & car rentals for your next adventure.</p>
          </Link>

          <Link
            href="/reviews"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
             <img src="https://cdn.futura-sciences.com/sources/images/G%C3%A9olocalisation%20sur%20une%20carte%20via%20GPS.jpeg" alt="Editing Services" className="w-full h-48 object-cover rounded-lg mb-3"/>
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p>Easily navigate and explore destinations with maps, routes, and location insights.</p>
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
