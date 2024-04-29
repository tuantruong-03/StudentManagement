import { useEffect, useState } from "react"
import { Table } from 'react-bootstrap'

const TEACHERS_API = process.env.REACT_APP_BASE_URL + '/api'
console.log(TEACHERS_API)


const AdminTeachers = () => {
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0); // Total number of teachers
    const size = 5;

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(TEACHERS_API + `/numberOfTeachers`);
            const data = await response.json(); // Total number of teachers
            return data;
        }
        fetchData().then(data => {
            const totalPage = Math.ceil(data / size);
            setTotalPage(totalPage)

        })
    }, [])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(TEACHERS_API + `/teachers?page=${page}`);
            const data = await response.json();
            setData(data)
            // console.log(data)
        }
        fetchData()

    }, [page])



    return <> <Table bordered>
        <thead className='thead' >
            <tr style={{ backgroundColor: 'lightblue' }}>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Email</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((teacher, index) => (
                    <tr key={index}>
                        <th scope="row">{index + (page - 1) * size}</th>
                        <td>{teacher.firstName}</td>
                        <td>{teacher.lastName}</td>
                        <td>{teacher.email}</td>
                    </tr>
                ))}
        </tbody>

    </Table>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item"><button className="page-link">Previous</button></li>
                {/* Generate page */}
                {Array.from({ length: totalPage }, (_, index) => (
                    <li key={index} className="page-item">
                        <button className="page-link">{index + 1}</button>
                    </li>
                ))}
                {/*  */}
                <li className="page-item"><button className="page-link">Next</button></li>
            </ul>
        </nav>
    </>
}

export default AdminTeachers