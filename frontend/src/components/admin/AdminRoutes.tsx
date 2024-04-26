import { Route, Routes } from "react-router-dom"
import AdminDashboard from "./AdminDashboard"
import AdminTeachers from "./AdminTeachers"
import AdminLayout from "./AdminLayout"


const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout/>}>
                <Route index element={<AdminDashboard/>}/>
                <Route path="/admin/teachers" element={<AdminTeachers/>}/>
            </Route>
        </Routes>
    )
}
export default AdminRoutes;