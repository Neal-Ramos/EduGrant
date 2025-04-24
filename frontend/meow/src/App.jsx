import { Routes, Route, Navigate } from "react-router-dom";
import ClientApplication from "./client/client-application";
import ClientDashboard from "./client/client-dashboard";
import ClientHome from "./client/client-home";
import ClientLogin from "./client/client-login";
import ClientProfile from "./client/client-profile";
import ScholarshipDetail from "./client/school-details";
import ClientScholarship from "./client/client-scholarship";

import LoginAdmin from "./admin/admin-login";
import Home from "./admin/admin-home";
import Application from "./admin/admin-application";
import Dashboard from "./admin/admin-dashboard";
import Scholarships from "./admin/admin-scholarships";
import Announcements from "./admin/admin-announcements";
import VerificationPage from "./client/verify-email";
import ScholarshipsReport from "./admin/admin-scholarships-report";
import ScholarshipsArchive from "./admin/admin-scholarships-archive";

import { ThemeProvider } from "./components/ui/darkmode";
import { Toaster } from "@/components/ui/sonner";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster position="bottom-right" richColors />
      <Routes>
        {/* CLIENT ROUTES */}
        <Route path="/" element={<ClientLogin />} />
        <Route path="/verify-email" element={<VerificationPage />} />
        <Route path="/home" element={<ClientHome />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="applications" element={<ClientApplication />} />
          <Route path="scholarships" element={<ClientScholarship />} />
          <Route path="scholarship/:id" element={<ScholarshipDetail />} />
          <Route path="profile" element={<ClientProfile />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin-login" element={<LoginAdmin />} />
        <Route path="/admin-home" element={<Home />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="applications" element={<Application />} />
          <Route path="scholarships" element={<Scholarships />} />
          <Route path="scholarships-report" element={<ScholarshipsReport />} />
          <Route
            path="scholarships-archive"
            element={<ScholarshipsArchive />}
          />
          <Route path="announcements" element={<Announcements />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
