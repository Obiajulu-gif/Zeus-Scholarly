import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "./AuthProvider";

export default function ProtectedRoutes({ children }) {
  const { user } = useContext(UsersContext);

  // Check if the user is authenticated by Firebase Authentication
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}