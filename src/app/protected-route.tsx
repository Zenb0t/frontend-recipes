import { Navigate, Route, useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "../components/dashboard-layout";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import useAuthHandler from "../hooks/useAuthHandler";

function ProtectedRoute() {
  const { isAuthenticated, user, loginWithRedirect } = useAuthHandler();
  const location = useLocation();

  if (isAuthenticated && user) {
    return <DashboardLayout />;
  } else {
    loginWithRedirect({
      appState: { returnTo: location.pathname },
    });
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
