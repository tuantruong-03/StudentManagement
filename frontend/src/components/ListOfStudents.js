import { useState, useEffect } from 'react'

const STUDENT_API = 'http://localhost:8080/api/students'

function ListOfStudents() {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData(url) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data)
                setData(data)
                return data;
            } catch (err) {
                throw err;
            }
        }
        fetchData(STUDENT_API);

    }, [])
    return (
        <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                {data.map(student => { return (
                    <tr key={student.userId}>
                        <th scope="row">{student.userId}</th>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.email}</td>
                    </tr>
                )})}
            </tbody>
        </table>
    )
}
export default ListOfStudents;