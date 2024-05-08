import { useEffect, useRef, useState } from "react"
import UserPagination from "../common/UserPagination"
import useApi from "../../../hooks/Api"
import CoursePagination from "./CoursePagination";
import { COURSES_PER_PAGE } from "../../../constants/Constant";




const AdminStudent = () => {
    const api = useApi();
    const [totalPage, setTotalPage] = useState<number>(0); // Total number of teachers
    const size = COURSES_PER_PAGE;
    // Fetch number of users
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('api/v1/numberOfCourses');
                const data: any = await response.data; // Assuming API returns the total number directly
                const totalPage = Math.ceil(data / size);
                setTotalPage(totalPage);
            } catch (err) {
                console.error('Error fetching data:', err);
                // Optionally handle the error by updating the component state
            }
        }

        fetchData();
    }, []); 
   return (<CoursePagination totalPage={totalPage} courseByPageApi={'api/v1/courses'}/>)
}

export default AdminStudent