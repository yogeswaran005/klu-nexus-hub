
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useAuth } from '../context/AuthContext';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [seats, setSeats] = useState('');
  const [image, setImage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here would be the logic to save the event
    // For now, we'll simulate a successful creation
    
    toast({
      title: "Event Created",
      description: "Your event has been successfully created.",
    });
    
    navigate('/events/manage');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Event Date</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Event Time</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Event Description</Label>
                <Textarea 
                  id="description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  rows={5}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seats">Number of Seats</Label>
                <Input 
                  id="seats" 
                  type="number" 
                  value={seats} 
                  onChange={(e) => setSeats(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  value={image} 
                  onChange={(e) => setImage(e.target.value)} 
                  placeholder="https://example.com/image.jpg" 
                />
                <p className="text-sm text-gray-500">Provide a URL for the event image</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="club">Club</Label>
                <Input 
                  id="club" 
                  value={user?.club || ''} 
                  disabled
                />
              </div>
              
              <div className="pt-4 flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/events/manage')}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Event</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CreateEvent;
