
import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Calendar, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '../context/AuthContext';

const InchargeDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Club Incharge Dashboard</h1>
          <p className="text-gray-600">Manage events for {user?.club}</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Club Events
              </CardTitle>
              <CardDescription>
                Manage your club's events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/events/manage">
                <Button className="w-full mt-4">
                  Manage Events
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                Create Event
              </CardTitle>
              <CardDescription>
                Add a new event for your club
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/events/create">
                <Button className="w-full mt-4">
                  Create New Event
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Registrations
              </CardTitle>
              <CardDescription>
                View and manage event registrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/registrations">
                <Button className="w-full mt-4">
                  View Registrations
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default InchargeDashboard;
