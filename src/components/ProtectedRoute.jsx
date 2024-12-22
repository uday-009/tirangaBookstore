// components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import useAuth from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authData } = useAuth();

  if (!authData.isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
