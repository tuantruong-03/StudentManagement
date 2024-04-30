import { useEffect, useState } from "react"
import { Table } from 'react-bootstrap'

const API_URL = process.env.REACT_APP_BASE_URL + '/api'
console.log(API_URL)

interface TableDataProps {
    users: any[],
    page: number,
    size: number
}

const TableData = (props: TableDataProps) => {
    const {users, page, size} = props;
    return (
        <div style={{ overflowX: 'auto' }}>
          <Table bordered style={{ minWidth: '800px', tableLayout: 'fixed' }}>
            <thead className='thead'>
              <tr style={{ backgroundColor: 'lightblue' }}>
                <th scope="col" style={{ width: '10%' }}>#</th>
                <th scope="col" style={{ width: '30%' }}>First</th>
                <th scope="col" style={{ width: '30%' }}>Last</th>
                <th scope="col" style={{ width: '30%' }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1 + (page - 1) * size}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }


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
        <TableData users={data} size={size} page={page}/>
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