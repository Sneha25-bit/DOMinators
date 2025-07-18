
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import InfoPage from "./pages/InfoPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import CommunityPage from "./pages/CommunityPage";
import GamesPage from "./pages/GamesPage";
import ExploreOceanPage from "./pages/ExploreOceanPage";
import UserDashboard from "./pages/UserDashboard";
import MyDonations from "./pages/MyDonations";
import MyFriends from "./pages/MyFriends";
import PaymentPage from "./pages/PaymentPage";
import NotFound from "./pages/NotFound";
import MarineCategories from "./pages/MarineCategories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<InfoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/explore-ocean" element={<ExploreOceanPage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/my-donations" element={<MyDonations />} />
            <Route path="/my-friends" element={<MyFriends />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/marine-mammals" element={<MarineCategories/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
