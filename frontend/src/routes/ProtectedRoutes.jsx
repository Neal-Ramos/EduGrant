import { useContext } from "react";
import {Outlet, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoutes = () => {
  const {user, loading} = useContext(AuthContext)
  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/" />
  return <Outlet/>
}

export default ProtectedRoutes