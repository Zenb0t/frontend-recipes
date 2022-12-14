import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../components/dashboard-layout";

function ProtectedRoute() {
    const { isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return <DashboardLayout />;
};


export default ProtectedRoute; 