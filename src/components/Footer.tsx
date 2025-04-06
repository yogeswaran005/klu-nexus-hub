
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">KLU EVENTS</h3>
            <p className="text-gray-300">
              Your gateway to all events happening at KLU. Register, participate, and stay updated.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/events" className="text-gray-300 hover:text-white">Events</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <address className="not-italic text-gray-300">
              <p>Kalasalingam University</p>
              <p>Anand Nagar, Krishnankoil</p>
              <p>Tamil Nadu, India</p>
              <p className="mt-2">Email: events@klu.ac.in</p>
              <p>Phone: +91 12345 67890</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} KLU EVENTS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
