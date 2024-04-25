import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider"
import { ReactNode } from "react";

const PrivateRoute = ({children}: {children: ReactNode}) => {
    const auth = useAuth();
    // Add <> </> to return JSX.Element
    return <>{
        auth.isAuthenticated ? children : <Navigate to="/login" />}
        </>;
}

export default PrivateRoute;