import React, { useState, useEffect, FC, ReactNode } from 'react'
import {Table} from 'react-bootstrap'
const STUDENT_API = process.env.REACT_APP_BASE_URL + '/api/students'

function ListOfStudents() {
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        async function fetchData(url: string) {
            try {
                const response = await fetch(url);
                const data: any[] = await response.json();
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
        <Table bordered>
            <thead className='thead' >
                <tr style={{backgroundColor: 'lightblue'}}>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                {data.map(student =>  (
                    <tr key={student.userId}>
                        <th scope="row">{student.userId}</th>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.email}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )

}
export default ListOfStudents;