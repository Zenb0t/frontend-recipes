import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "@chakra-ui/react";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export type ProtectedRouteProps = {
    // path: string;
    element: React.ReactElement;
};

function ProtectedRoute() {
    const { isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet/>;
};


export default ProtectedRoute; 