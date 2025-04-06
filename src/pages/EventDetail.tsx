
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, Users, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getEventById } from '../lib/data';
import { useToast } from '../hooks/use-toast';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [registering, setRegistering] = useState(false);
  
  const event = id ? getEventById(id) : undefined;
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-6">
              The event you're looking for might have been removed or doesn't exist.
            </p>
            <button 
              onClick={() => navigate('/events')}
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Events
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const availableSeats = event.seats - event.registeredCount;
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const handleRegister = () => {
    setRegistering(true);
    // Simulate API call
    setTimeout(() => {
      setRegistering(false);
      toast({
        title: "Registration Successful",
        description: `You've successfully registered for ${event.title}`,
      });
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Event Banner */}
      <div className="relative h-64 md:h-96 bg-gray-800">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white">
          <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium mb-4">
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
          <div className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            <span>Organized by {event.organizer}</span>
          </div>
        </div>
      </div>
      
      {/* Event Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {event.description}
              </p>
              
              <div className="border-t pt-6">
                <h3 className="text-xl font-bold mb-4">Event Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Date</h4>
                      <p className="text-gray-600">{formattedDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Time</h4>
                      <p className="text-gray-600">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Capacity</h4>
                      <p className="text-gray-600">{event.seats} seats total</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
              <h3 className="text-xl font-bold mb-4">Registration</h3>
              
              {availableSeats > 0 ? (
                <>
                  <div className="flex justify-between text-lg mb-2">
                    <span className="font-medium">{availableSeats} seats left</span>
                    <span>{event.registeredCount}/{event.seats}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${(event.registeredCount / event.seats) * 100}%` }}
                    ></div>
                  </div>
                  
                  <button 
                    className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                    onClick={handleRegister}
                    disabled={registering}
                  >
                    {registering ? 'Processing...' : 'Register for This Event'}
                  </button>
                </>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Fully Booked</h4>
                    <p className="text-yellow-700 text-sm">
                      This event has reached its capacity. Please check back later for cancellations.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="mt-6 border-t pt-6">
                <h4 className="font-medium mb-2">Share this event</h4>
                <div className="flex space-x-2">
                  <button className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </button>
                  <button className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>
                  <button className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default EventDetail;
