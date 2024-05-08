import { useEffect, useRef, useState } from "react"
import UserPagination from "../common/UserPagination"

import useApi from "../../../hooks/Api"
import {  USERS_PER_PAGE } from "../../../constants/Constant"

const API_URL = process.env.REACT_APP_BASE_URL + '/api'
console.log(API_URL)


const AdminTeacher = () => {
    const api = useApi();
    const [totalPage, setTotalPage] = useState<number>(0); // Total number of teachers
    const size = USERS_PER_PAGE;
    // Fetch number of users /numberOfTeachers
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('api/v1/numberOfTeachers');
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
    // "/admin/student"
    // Test
   return (<UserPagination totalPage={totalPage} usersByPageApi={'/api/v1/teachers'}/>)
}

export default AdminTeacher