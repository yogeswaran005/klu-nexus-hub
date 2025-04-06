
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Auth from "./pages/Auth";
import InchargeDashboard from "./pages/InchargeDashboard";
import CreateEvent from "./pages/CreateEvent";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

// Move QueryClient creation inside the component to properly handle React hooks lifecycle
const App = () => {
  // Create a client
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Navigate to="/auth" replace />} />
              <Route path="/home" element={<Index />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/dashboard" element={
                <ProtectedRoute requiredRole="incharge">
                  <InchargeDashboard />
                </ProtectedRoute>
              } />
              <Route path="/events/create" element={
                <ProtectedRoute requiredRole="incharge">
                  <CreateEvent />
                </ProtectedRoute>
              } />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
