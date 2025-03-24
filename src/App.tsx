
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import Home from './pages/Home';
import OpportunityDetail from './pages/OpportunityDetail';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Calendar from './pages/Calendar';
import Notifications from './pages/Notifications';
import OrganizerDashboard from './pages/organizer/Dashboard';
import OpportunityCreation from './pages/organizer/OpportunityCreation';
import VolunteerManagement from './pages/organizer/VolunteerManagement';
import Analytics from './pages/organizer/Analytics';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/opportunity/:id" element={<OpportunityDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/notifications" element={<Notifications />} />
          
          {/* Organizer Routes */}
          <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
          <Route path="/organizer/create" element={<OpportunityCreation />} />
          <Route path="/organizer/volunteers/:id" element={<VolunteerManagement />} />
          <Route path="/organizer/analytics" element={<Analytics />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
