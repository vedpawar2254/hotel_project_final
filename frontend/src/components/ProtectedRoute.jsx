// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    // Redirect to login if token not present
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
