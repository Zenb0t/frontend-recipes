import { Navigate, useNavigate } from "react-router-dom";
import { DashboardLayout } from "../components/dashboard-layout";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import useAuthHandler from "../hooks/useAuthHandler";

function ProtectedRoute() {
  const { isAuthenticated, user } = useAuthHandler();

  if (isAuthenticated && user) {
    return <DashboardLayout />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
