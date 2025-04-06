
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "../context/AuthContext";
import type { Role } from "../context/AuthContext"; // Import the Role type

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedTab, setSelectedTab] = useState("signin");
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('student'); // Explicitly type as Role
  const [club, setClub] = useState('');
  
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
  
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate a successful login
    const userData = {
      email,
      role, // This is now explicitly typed as Role
      name: role === "incharge" ? `${club} Incharge` : "KLU Student",
      club: role === "incharge" ? club : null
    };
    
    login(userData);
    
    toast({
      title: "Welcome!",
      description: "You have successfully signed in.",
    });
    
    // Redirect based on role
    navigate(role === 'incharge' ? '/dashboard' : '/events');
  };
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (role === 'incharge' && !club) {
      toast({
        title: "Error",
        description: "Please select a club",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate a successful registration
    toast({
      title: "Account created!",
      description: "Your account has been created successfully. You can now sign in.",
    });
    
    // Clear form and switch to sign in tab
    setEmail('');
    setPassword('');
    setName('');
    setSelectedTab("signin");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">KLU EVENTS</h1>
          <p className="text-gray-600">Kalasalingam University Event Management</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Welcome</CardTitle>
            <CardDescription className="text-center">
              Sign in to access KLU events or create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@klu.ac.in" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-role">I am a</Label>
                    <select
                      id="signin-role"
                      className="w-full p-2 border rounded-md"
                      value={role}
                      onChange={(e) => setRole(e.target.value as Role)}
                    >
                      <option value="student">Student</option>
                      <option value="incharge">Club Incharge</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full">Sign In</Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input 
                      id="signup-name" 
                      type="text" 
                      placeholder="Your Name" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="your.email@klu.ac.in" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password" 
                      type="password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-role">I am a</Label>
                    <select
                      id="signup-role"
                      className="w-full p-2 border rounded-md"
                      value={role}
                      onChange={(e) => setRole(e.target.value as Role)}
                    >
                      <option value="student">Student</option>
                      <option value="incharge">Club Incharge</option>
                    </select>
                  </div>
                  
                  {role === "incharge" && (
                    <div className="space-y-2">
                      <Label htmlFor="signup-club">Club</Label>
                      <select
                        id="signup-club"
                        className="w-full p-2 border rounded-md"
                        value={club}
                        onChange={(e) => setClub(e.target.value)}
                        required={role === "incharge"}
                      >
                        <option value="">Select Club</option>
                        {clubs.map((clubName) => (
                          <option key={clubName} value={clubName}>{clubName}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full">Sign Up</Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-gray-600">
            © {new Date().getFullYear()} Kalasalingam University
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
