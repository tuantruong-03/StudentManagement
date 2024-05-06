import { useEffect, useRef, useState } from "react"
import { Table } from 'react-bootstrap'
import TableUser from "./common/UserTable"
import {useSearchParams} from 'react-router-dom'
import UserPagination from "./common/UserPagination"
import { useAuth } from "../../hooks/AuthProvider"
import axios from "axios"

import useApi from "../../hooks/Api"

const API_URL = process.env.REACT_APP_BASE_URL + '/api'
console.log(API_URL)


const AdminTeacher = () => {
    const api = useApi();
    const [totalPage, setTotalPage] = useState<number>(0); // Total number of teachers
    const size = 5;
    // Fetch number of users /numberOfTeachers
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('api/numberOfTeachers');
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
   return (<UserPagination totalPage={totalPage} usersByPageApi={'/api/teachers'}/>)
}

export default AdminTeacher