import { useEffect, useState } from "react"
import { Table } from 'react-bootstrap'
import TableUser from "./common/TableUser"

const API_URL = process.env.REACT_APP_BASE_URL + '/api'
console.log(API_URL)

const AdminStudent = () => {
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0); // Total number of students
    const size = 5;

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(API_URL + `/numberOfStudents`);
            const data = await response.json(); // Total number of students
            return data;
        }
        fetchData().then(data => {
            const totalPage = Math.ceil(data / size);
            setTotalPage(totalPage)

        })
    }, [])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(API_URL + `/students?page=${page}`);
            const data = await response.json();
            setData(data)
            // console.log(data)
        }
        fetchData()

    }, [page])

    const handleClick = (event: any) => {
        const page = event.target.textContent;
        setPage(page)
    }



    return <>
        <TableUser users={data} size={size} page={page}/>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item"><button className="page-link">Previous</button></li>
                {/* Generate page */}
                {Array.from({ length: totalPage }, (_, index) => (
                    <li key={index} className="page-item">
                        <button onClick={handleClick} className="page-link">{index + 1}</button>
                    </li>
                ))}
                {/*  */}
                <li className="page-item"><button className="page-link">Next</button></li>
            </ul>
        </nav>
    </>
}

export default AdminStudent