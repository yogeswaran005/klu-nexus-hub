
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, UserCog, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/auth');
  };
  
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to={isAuthenticated ? (user?.role === 'incharge' ? '/dashboard' : '/events') : '/auth'} className="text-2xl font-bold">
            KLU EVENTS
          </Link>
          
          <div className="hidden md:flex space-x-6">
            {isAuthenticated && (
              <>
                <Link to="/events" className="hover:text-blue-200 transition-colors">
                  Events
                </Link>
                
                {user?.role === 'incharge' && (
                  <>
                    <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
                      Dashboard
                    </Link>
                    <Link to="/events/create" className="hover:text-blue-200 transition-colors">
                      Create Event
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm">
                  {user?.name} 
                  {user?.club && ` (${user?.club})`}
                </span>
                <Link to="/profile/edit">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    <UserCog className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button className="bg-white text-blue-600 hover:bg-blue-100 transition-colors">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 py-3 px-4">
          <div className="flex flex-col space-y-3">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/events" 
                  className="text-white hover:text-blue-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Events
                </Link>
                
                {user?.role === 'incharge' && (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="text-white hover:text-blue-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/events/create" 
                      className="text-white hover:text-blue-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      Create Event
                    </Link>
                  </>
                )}
                
                <hr className="border-blue-500" />
                
                <div className="text-sm text-white">
                  {user?.name} 
                  {user?.club && ` (${user?.club})`}
                </div>
                
                <Link 
                  to="/profile/edit"
                  className="flex items-center text-white hover:text-blue-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <UserCog className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center text-white hover:text-blue-200"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/auth"
                className="text-white hover:text-blue-200"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
