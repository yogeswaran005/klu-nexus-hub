
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            KLU EVENTS
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              Home
            </Link>
            <Link to="/events" className="hover:text-blue-200 transition-colors">
              Events
            </Link>
            
            {isAuthenticated && user?.role === 'incharge' && (
              <>
                <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
                  Dashboard
                </Link>
                <Link to="/events/manage" className="hover:text-blue-200 transition-colors">
                  Manage Events
                </Link>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm hidden md:inline">
                  {user?.name || user?.email} ({user?.role})
                  {user?.club && ` - ${user?.club}`}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button 
                  className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-100 transition-colors"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
