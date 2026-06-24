import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjects from "./pages/AdminProjects";
import AdminLeads from "./pages/AdminLeads";
import AdminInquiries from "./pages/AdminInquiries";
import ProtectedRoute from "./components/ProtectedRoute"; // NEW

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetails from "./pages/ProjectDetails";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ScheduleVisit from "./pages/ScheduleVisit";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout() {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />

      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/schedule-visit" element={<ScheduleVisit />} />

        {/* Admin Routes */}
        {/* Login stays unprotected — you need to reach it to log in */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Everything else under /admin now requires a valid token */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <AdminProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/leads"
          element={
            <ProtectedRoute>
              <AdminLeads />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/inquiries"
          element={
            <ProtectedRoute>
              <AdminInquiries />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminRoute &&
        location.pathname !== "/schedule-visit" && (
          <Footer />
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;