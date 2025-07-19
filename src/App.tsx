import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import GlobalLayout from './components/GlobalLayout';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import About from './pages/About';
import Join from './pages/Join';
import Events from './pages/Events';
import EventsPage from './pages/EventsPage';
import EventDetail from './pages/EventDetail';
import TechFrontPage from './pages/TechFrontPage'; // <-- Import your dedicated TechFront event page
import Projects from './pages/Projects';
import Team from './pages/Team';
import Volunteers from './pages/Volunteers';
import Blog from './pages/Blog';
import Resources from './pages/Resources';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Highlights from './pages/Highlights';
import Spotlights from './pages/Spotlights';
import Speakers from './pages/Speakers';
import Volunteer from './pages/Volunteer';
import Testimonials from './pages/Testimonials';
import CodeOfConduct from './pages/CodeOfConduct';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

// Import new pages for footer tiles
import Ambassadors from './pages/Ambassadors';
import WhoWeAre from './pages/WhoWeAre';
import EventsCalendar from './pages/EventsCalendar';
import MemberDirectory from './pages/MemberDirectory';
import GiveBack from './pages/GiveBack';
import FeaturedProjects from './pages/FeaturedProjects';
import ProjectMetrics from './pages/ProjectMetrics';
import IncubatingProjects from './pages/IncubatingProjects';
import GraduatedProjects from './pages/GraduatedProjects';
import AllSponsors from './pages/AllSponsors';
import BecomeSponsor from './pages/BecomeSponsor';
import SponsorBenefits from './pages/SponsorBenefits';
import PastSponsors from './pages/PastSponsors';
import Certification from './pages/Certification';
import MentorshipProgram from './pages/MentorshipProgram';
import LearningResourcesVault from './pages/LearningResourcesVault';
import CommunityGroups from './pages/CommunityGroups';
import Announcements from './pages/Announcements';
import Newsletters from './pages/Newsletters';
import Videos from './pages/Videos';
import Reports from './pages/Reports';
import SubmitEventProposal from './pages/SubmitEventProposal';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading resources - reduced to 1.5 seconds for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
      <ThemeProvider>
        <AuthProvider>
          <GlobalLayout>
            <Router>
              <Routes>
                {/* Main layout with header and footer */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="join" element={<Join />} />
                  <Route path="events" element={<Events />} />
                  <Route path="events-page" element={<EventsPage />} />
                  {/* Dedicated TechFront Event Page */}
                  <Route path="techfront" element={<TechFrontPage />} />
                  {/* DYNAMIC EVENT DETAIL ROUTE */}
                  <Route path="events/:slug" element={<EventDetail />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="team" element={<Team />} />
                  <Route path="volunteers" element={<Volunteers />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="resources" element={<Resources />} />
                  <Route path="gallery" element={<Gallery />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="highlights" element={<Highlights />} />
                  <Route path="spotlights" element={<Spotlights />} />
                  <Route path="speakers" element={<Speakers />} />
                  <Route path="volunteer" element={<Volunteer />} />
                  <Route path="testimonials" element={<Testimonials />} />
                  <Route path="code-of-conduct" element={<CodeOfConduct />} />
                  <Route path="terms" element={<Terms />} />
                  <Route path="privacy" element={<Privacy />} />
                  <Route path="admin" element={<Admin />} />
                  
                  {/* New routes for footer tiles */}
                  <Route path="ambassadors" element={<Ambassadors />} />
                  <Route path="who-we-are" element={<WhoWeAre />} />
                  <Route path="events-calendar" element={<EventsCalendar />} />
                  <Route path="give-back" element={<GiveBack />} />
                  <Route path="featured-projects" element={<FeaturedProjects />} />
                  <Route path="project-metrics" element={<ProjectMetrics />} />
                  <Route path="sponsors" element={<AllSponsors />} />
                  <Route path="become-sponsor" element={<BecomeSponsor />} />
                  <Route path="sponsor-benefits" element={<SponsorBenefits />} />
                  <Route path="past-sponsors" element={<PastSponsors />} />
                  <Route path="certification" element={<Certification />} />
                  <Route path="mentorship" element={<MentorshipProgram />} />
                  <Route path="learning-resources" element={<LearningResourcesVault />} />
                  <Route path="community-groups" element={<CommunityGroups />} />
                  <Route path="announcements" element={<Announcements />} />
                  <Route path="newsletters" element={<Newsletters />} />
                  <Route path="videos" element={<Videos />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="submit-event-proposal" element={<SubmitEventProposal />} />
                  
                  {/* 404 Page */}
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Redirect legacy routes */}
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/event/:id" element={<Navigate to="/events" replace />} />
              </Routes>
            </Router>
          </GlobalLayout>
        </AuthProvider>
      </ThemeProvider>
  );
}

export default App;