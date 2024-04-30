import { useEffect, useRef, useState } from "react"
import { Table } from 'react-bootstrap'
import TableUser from "./common/UserTable"
import {useSearchParams} from 'react-router-dom'
import UserPagination from "./common/UserPagination"

const API_URL = process.env.REACT_APP_BASE_URL + '/api'
console.log(API_URL)


const AdminTeacher = () => {
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
            const response = await fetch(API_URL + `/numberOfTeachers`);
            const data = await response.json(); // Total number of teachers
            return data;
        }
        fetchData().then(data => {
            const totalPage = Math.ceil(data / size);
            setTotalPage(totalPage)

        })
    }, [])
   return (<UserPagination totalPage={totalPage} usersByPageApi={API_URL + '/teachers'}/>)
}

export default AdminTeacher