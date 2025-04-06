
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <ShieldAlert className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Unauthorized Access</h1>
          <p className="text-gray-600 mb-6">
            Sorry, you don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
          </p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Unauthorized;
