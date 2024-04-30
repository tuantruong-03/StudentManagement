import { useEffect, useRef, useState } from "react"
import { Table } from 'react-bootstrap'
import TableUser from "./common/UserTable"
import {useSearchParams} from 'react-router-dom'
import UserPagination from "./common/UserPagination"

const API_URL = process.env.REACT_APP_BASE_URL + '/api'
console.log(API_URL)


const AdminStudent = () => {
    const [totalPage, setTotalPage] = useState<number>(0); // Total number of teachers
    const size = 5;
    // Fetch number of users
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(API_URL + `/numberOfStudents`);
            const data = await response.json(); // Total number of teachers
            return data;
        }
        fetchData().then(data => {
            const totalPage = Math.ceil(data / size);
            setTotalPage(totalPage)

        })
    }, [])
   return (<UserPagination totalPage={totalPage} usersByPageApi={API_URL + '/students'}/>)
}

export default AdminStudent