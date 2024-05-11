import { useEffect, useState } from "react";
import useApi from "../../../hooks/Api";

const AdminCourseDetail = () => {
    const pathname = window.location.pathname;
    // Ex: /admin/course/Introduction%20to%20Python%20B
    const pathnameParts = pathname.split("/");
    const courseId = decodeURIComponent(pathnameParts[pathnameParts.length-1]);
    const [students, setStudents] = useState<any[]>([])
    const [teachers, setTeachers] = useState<any[]>([])

    const api = useApi();
    const fetchStudentList = async () => {
        try {
            const response = await api.get(`/api/v1/course/${courseId}/students`);
            if (response.status == 200) {
                const students = response.data;
                setStudents(students)
            } else {
                throw new Error("Can't fetch this api")
            }

        } catch(err) {  
            throw err;
        }
        
    }  
    const fetchTeacherList = async () => {
        try {
            const response = await api.get(`/api/v1/course/${courseId}/teachers`);
            if (response.status == 200) {
                const teachers = response.data;
                setTeachers(teachers)
            } else {
                throw new Error("Can't fetch this api")
            }

        } catch(err) {  
            throw err;
        }
        
    }      

    useEffect(() => {
        fetchStudentList()
        fetchTeacherList()
        console.log(students)
        console.log(teachers)
    },[])
    
    return (
        <>
            Welcome to {courseId}
        </>
        
    )
}

export default AdminCourseDetail