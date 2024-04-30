import { Route, Routes } from "react-router-dom"
import AdminDashboard from "./AdminDashboard"
import AdminTeacher from "./AdminTeacher"
import AdminLayout from "./AdminLayout"
import AdminStudent from "./AdminStudent"


const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout/>}>
                <Route index element={<AdminDashboard/>}/>
                <Route path="/admin/teachers" element={<AdminTeacher/>}/>
                <Route path="/admin/students" element={<AdminStudent/>}/>
            </Route>
        </Routes>
    )
}
export default AdminRoutes;