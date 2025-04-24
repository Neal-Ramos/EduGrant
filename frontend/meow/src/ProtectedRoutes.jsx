import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_EXPRESS_API_EDUGRANT}/tokenValidation`,{},{ withCredentials: true })
        if (res.status === 200) {setIsAuthenticated(true)}
      } catch (error) {setIsAuthenticated(false)}
    };

    checkAuth();
  }, []);
  if (isAuthenticated === null) {return <div>Loading...</div>;}
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;