import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/app/Dashboard";
import Indexes from "./pages/app/Indexes";
import IndexDetail from "./pages/app/IndexDetail";
import Forecasts from "./pages/app/Forecasts";
import ForecastDetail from "./pages/app/ForecastDetail";
import SubmitForecast from "./pages/app/SubmitForecast";
import CreateForecast from "./pages/app/CreateForecast";
import CrowdAccuracy from "./pages/app/CrowdAccuracy";
import CrowdReliability from "./pages/app/CrowdReliability";
import TrendsValidation from "./pages/app/TrendsValidation";
import Briefings from "./pages/app/Briefings";
import Reports from "./pages/app/Reports";
import Leaderboards from "./pages/app/Leaderboards";
import Watchlists from "./pages/app/Watchlists";
import Alerts from "./pages/app/Alerts";
import Pricing from "./pages/app/Pricing";
import Enterprise from "./pages/app/Enterprise";
import Investors from "./pages/app/Investors";
import Profile from "./pages/app/Profile";
import Admin from "./pages/app/Admin";
import Trust from "./pages/app/Trust";
import Methodology from "./pages/app/Methodology";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/app" element={<Dashboard />} />
          <Route path="/app/indexes" element={<Indexes />} />
          <Route path="/app/indexes/:id" element={<IndexDetail />} />
          <Route path="/app/forecasts" element={<Forecasts />} />
          <Route path="/app/forecasts/new" element={<CreateForecast />} />
          <Route path="/app/forecasts/:id" element={<ForecastDetail />} />
          <Route path="/app/forecasts/:id/submit" element={<SubmitForecast />} />
          <Route path="/app/accuracy" element={<CrowdAccuracy />} />
          <Route path="/app/reliability" element={<CrowdReliability />} />
          <Route path="/app/trends" element={<TrendsValidation />} />
          <Route path="/app/briefings" element={<Briefings />} />
          <Route path="/app/reports" element={<Reports />} />
          <Route path="/app/leaderboards" element={<Leaderboards />} />
          <Route path="/app/watchlists" element={<Watchlists />} />
          <Route path="/app/alerts" element={<Alerts />} />
          <Route path="/app/pricing" element={<Pricing />} />
          <Route path="/app/enterprise" element={<Enterprise />} />
          <Route path="/app/investors" element={<Investors />} />
          <Route path="/app/profile/:id" element={<Profile />} />
          <Route path="/app/admin" element={<Admin />} />
          <Route path="/app/trust" element={<Trust />} />
          <Route path="/app/methodology" element={<Methodology />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
