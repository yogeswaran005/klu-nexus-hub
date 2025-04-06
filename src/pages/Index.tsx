
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { getUpcomingEvents } from '../lib/data';

const Index = () => {
  const featuredEvents = getUpcomingEvents(4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-blue-700 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1470&auto=format&fit=crop)'
          }}
        ></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover & Join KLU Events
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Stay updated with all the events happening at Kalasalingam University. Find, register and participate in academic, cultural and sports events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/events" 
                className="bg-white text-blue-700 px-6 py-3 rounded-md font-medium text-center hover:bg-blue-50 transition-colors"
              >
                Browse Events
              </Link>
              <button 
                className="border-2 border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-700 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Events */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Upcoming Events</h2>
            <Link to="/events" className="text-blue-600 hover:text-blue-800 font-medium">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Highlight Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-blue-100 rounded-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop" 
                  alt="Annual Technical Symposium" 
                  className="h-64 md:h-full w-full object-cover"
                />
              </div>
              <div className="p-6 md:w-1/2 flex flex-col justify-center">
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium mb-4">
                  Featured Event
                </span>
                <h3 className="text-2xl font-bold mb-2">Annual Technical Symposium</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>June 10, 2025 | 9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>KLU Convention Center</span>
                </div>
                <p className="text-gray-700 mb-6">
                  The flagship technical event of KLU featuring paper presentations, technical quizzes, and innovative project showcases from students across departments.
                </p>
                <Link 
                  to="/events/2" 
                  className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium text-center hover:bg-blue-700 transition-colors self-start"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Want to organize an event?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Submit your event proposal through our online form and reach the KLU community.
          </p>
          <button className="bg-white text-blue-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
            Submit Event Proposal
          </button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
