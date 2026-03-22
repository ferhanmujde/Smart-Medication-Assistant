import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home";
import MedicationList from "./pages/MedicationList";
import MedicationDetail from "./pages/MedicationDetail";
import AddMedication from "./pages/AddMedication";
import AIAssistant from "./pages/AIAssistant";
import FamilyView from "./pages/FamilyView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/medications" element={<MedicationList />} />
          <Route path="/medications/:id" element={<MedicationDetail />} />
          <Route path="/add" element={<AddMedication />} />
          <Route path="/assistant" element={<AIAssistant />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
