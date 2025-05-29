// components/ProtectedRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
