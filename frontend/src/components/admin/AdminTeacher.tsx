import { useEffect, useRef, useState } from "react"
import { Table } from 'react-bootstrap'
import TableUser from "./common/UserTable"
import {useSearchParams} from 'react-router-dom'
import UserPagination from "./common/UserPagination"
import { useAuth } from "../../hooks/AuthProvider"
import axios from "axios"

const API_URL = process.env.REACT_APP_BASE_URL + '/api'
console.log(API_URL)


const AdminTeacher = () => {
    const auth = useAuth();
    const token = auth.token;
    const pageRefs = useRef<HTMLButtonElement[]>([]);
    const [searchParams, setSearchParams] = useSearchParams()
    const [data, setData] = useState<any[]>([]);
    const pageInit = parseInt(searchParams.get('page') || '1'); // !null or '1'
    const [page, setPage] = useState<number>(pageInit);
    const [totalPage, setTotalPage] = useState<number>(0); // Total number of teachers
    const size = 5;
    // Fetch number of users
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(API_URL + "/numberOfTeachers", {
                    method: 'GET',
                    // headers: {
                    //     'Authorization': `Bearer ${token}`
                    // }
                });
                const data: any = await response.json(); // Assuming API returns the total number directly
                console.log(data)
                const totalPage = Math.ceil(data / size);
                console.log(totalPage)
                setTotalPage(totalPage);
            } catch (err) {
                console.error('Error fetching data:', err);
                // Optionally handle the error by updating the component state
            }
        }

        fetchData();
    }, []); 
   return (<UserPagination totalPage={totalPage} usersByPageApi={API_URL + '/teachers'}/>)
}

export default AdminTeacher