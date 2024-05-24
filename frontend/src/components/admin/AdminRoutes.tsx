import { Route, Routes } from "react-router-dom"
import AdminDashboard from "./AdminDashboard/AdminDashboard"
import AdminTeacher from "./AdminTeacher/AdminTeacher"
import AdminLayout from "./AdminLayout"
import AdminStudent from "./AdminStudent/AdminStudent"
import AdminCourse from "./AdminCourse/AdminCourse"
import AdminCourseDetail from "./AdminCourse/AdminCourseDetail"


const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout/>}>
                <Route index element={<AdminCourse/>}/>
                <Route path="/admin/teachers" element={<AdminTeacher/>}/>
                <Route path="/admin/students" element={<AdminStudent/>}/>
                <Route path="/admin/courses" element={<AdminCourse/>}/>
                <Route path="/admin/course/:name" element={<AdminCourseDetail/>}/>
            </Route>
        </Routes>
    )
}
export default AdminRoutes;