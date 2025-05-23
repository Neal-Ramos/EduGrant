import { Routes, Route, Navigate } from "react-router-dom";
import ClientApplication from "./client/client-application";
import ClientDashboard from "./client/client-dashboard";
import ClientHome from "./client/client-home";
import ClientLogin from "./client/client-login";
import ClientProfile from "./client/client-profile";
import ScholarshipDetail from "./client/school-details";
import ClientScholarship from "./client/client-scholarship";
import ClientNotif from "./client/client-notif";

import LoginAdmin from "./admin/admin-login";
import Home from "./admin/admin-home";
import Application from "./admin/admin-application";
import Dashboard from "./admin/admin-dashboard";
import Scholarships from "./admin/admin-scholarships";
import Announcements from "./admin/admin-announcements";
import VerificationPage from "./client/verify-email";
import ScholarshipsArchive from "./admin/admin-scholarships-archive";
import OpenScholarship from "./admin/scholarship-details";
import { ThemeProvider } from "./components/ui/darkmode";
import { Toaster } from "@/components/ui/sonner";

import ProtectedRoutes from "./routes/ProtectedRoutes";
import ProtectedRoutesAdmin from "./routes/ProtectedRoutesAdmin";
import AuthProvider from "./context/AuthProvider";

import { NotFoundPage } from "./404";
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Toaster position="bottom-right" richColors />
      <Routes>
        {/* CLIENT ROUTES */}
        <Route path="/" element={<AuthProvider><ClientLogin /></AuthProvider>} />
        <Route path="/verify-email" element={<VerificationPage />} />
        <Route element={<AuthProvider><ProtectedRoutes /></AuthProvider>}>
        <Route path="/home" element={<ClientHome />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="applications" element={<ClientApplication />} />
          <Route path="scholarships" element={<ClientScholarship />} />
          <Route path="scholarship/:id" element={<ScholarshipDetail />} />
          <Route path="profile" element={<ClientProfile />} />
          <Route path="notification" element={<ClientNotif />} />
        </Route>
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin-login" element={<LoginAdmin />} />
        <Route element={<ProtectedRoutesAdmin />}>
          <Route path="/admin-home" element={<Home />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="applications" element={<Application />} />
            <Route path="scholarships" element={<Scholarships />} />
            <Route path="scholarships/:id" element={<OpenScholarship />} />
            <Route
              path="scholarships/archived"
              element={<ScholarshipsArchive />}
            />
            <Route path="announcements" element={<Announcements />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
