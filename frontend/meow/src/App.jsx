import { Routes, Route, Navigate } from "react-router-dom";
import ClientApplication from "./client/client-application";
import ClientDashboard from "./client/client-dashboard";
import ClientHome from "./client/client-home";
import ClientLogin from "./client/client-login";
import ClientProfile from "./client/client-profile";
import ScholarshipDetail from "./client/school-details";
import ClientScholarship from "./client/client-scholarship";
function App() {
  return (
    <Routes>
      <Route path="/" element={<ClientLogin />} />
      <Route path="/home" element={<ClientHome />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="applications" element={<ClientApplication />} />
        <Route path="scholarships" element={<ClientScholarship />} />
        <Route path="scholarship/:id" element={<ScholarshipDetail />} />
        <Route path="profile" element={<ClientProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
