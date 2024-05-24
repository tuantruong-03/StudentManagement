import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/AuthProvider";
import AdminDashboard from "../admin/AdminLayout";
import AdminRoutes from "../admin/AdminRoutes";


const Homepage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const user = auth.user;
    const isAdmin: boolean = user?.authorities.some((auth: { authority: string; }) => auth.authority === 'ROLE_ADMIN');
    const isTeacher: boolean = user?.authorities.some((auth: { authority: string; }) => auth.authority === 'ROLE_TEACHER');
    const isStudent: boolean = user?.authorities.some((auth: { authority: string; }) => auth.authority === 'ROLE_STUDENT');
    if (isAdmin) {
        return (
            <AdminRoutes />
        )
    }
    return <>
        Welcome {user.firstName + " " + user.lastName}
        <li className="nav-item">
            <button className="btn btn-outline-danger" onClick={auth.logout}>Logout</button>
        </li>
    </>
}

export default Homepage;