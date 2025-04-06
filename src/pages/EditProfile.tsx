
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "../hooks/use-toast";
import { useAuth } from '../context/AuthContext';

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [club, setClub] = useState('');
  
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setClub(user.club || '');
    }
  }, [user]);
  
  const clubs = [
    "Pyros",
    "Tamil Mandram",
    "Sherlac Homes",
    "Nature Club",
    "YRC",
    "Tech",
    "Code Block",
    "10x Club",
    "ACM"
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    // Update the user profile
    const updatedUser = {
      ...user,
      name,
      email,
      club: user.role === 'incharge' ? club : user.club
    };
    
    updateUser(updatedUser);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    
    // Navigate back
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input 
                    id="role" 
                    value={user?.role === 'incharge' ? 'Club Incharge' : 'Student'} 
                    disabled
                  />
                </div>
                
                {user?.role === 'incharge' && (
                  <div className="space-y-2">
                    <Label htmlFor="club">Club</Label>
                    <select
                      id="club"
                      className="w-full p-2 border rounded-md"
                      value={club}
                      onChange={(e) => setClub(e.target.value)}
                      required
                    >
                      <option value="">Select Club</option>
                      {clubs.map((clubName) => (
                        <option key={clubName} value={clubName}>{clubName}</option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div className="pt-4 flex justify-end gap-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EditProfile;
