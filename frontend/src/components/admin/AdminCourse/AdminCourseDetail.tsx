import { useEffect, useState } from "react";
import useApi from "../../../hooks/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import InsertTeacherToCourseModal from "../../modal/InsertTeacherToCourseModal";
import InsertUserToCourseModal from "../../modal/InsertUserToCourseModal";
import DeleteUserFromCourseModal from "../../modal/DeleteUserFromCourseModal";



interface UserTableProps {
    users: any[],
    role: string,

}

const identifyApiUrl = (role: string): string => {
    if (role == 'teacher') {
        return '/api/v1/allTeachers'
    }
    if (role == 'student') {
        return '/api/v1/allStudents'
    }
    return "unknown"
}

const UserTable = (props: UserTableProps) => {
    const { users, role } = props;

    const [deleteUsers, setDeleteUsers] = useState<string[]>([]) // Just contain user email

    const apiUrl = identifyApiUrl(role);    // Define API to fetch list of teachers or students in "InsertUserToCourseModal"

    // For modal
    const [showInsertUserToCourseModal, setShowInsertUserToCourseModal] = useState<boolean>(false)
    const [showDeleteUserFromCourseModal, setShowDeleteUserFromCourseModal] = useState<boolean>(false)

    const handleCheckBoxToggle = (userEmail: string) => {
        if (deleteUsers.includes(userEmail)) {
            setDeleteUsers(deleteUsers.filter(email => email !== userEmail))
        } else {
            setDeleteUsers([...deleteUsers, userEmail])
        }
    }
    const handleSelectAllUsers = () => {
        if (deleteUsers.length < users.length) {
            const userEmails = users.map(user => user.email);
            setDeleteUsers(userEmails)
        } else {
            setDeleteUsers([])
        }
    }

    return (
        <>
            <div className="header d-flex align-items-center">
                <h1 style={{ display: 'inline-block' }}>List</h1>
                <button type="button" title="Create" onClick={() => setShowInsertUserToCourseModal(true)} className="mx-3 my-2 btn app-btn-primary">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <button type="button" onClick={() => setShowDeleteUserFromCourseModal(true)} className="btn app-btn-primary" title="Delete" disabled={deleteUsers.length == 0}><FontAwesomeIcon icon={faTrash} /></button>
            </div>

            <div style={{ overflowX: 'auto', textAlign: 'center' }}>
                <Table bordered style={{ minWidth: '800px', tableLayout: 'fixed' }}>
                    <thead className='thead'>
                        <tr>
                            <th scope="col" className="table-header-bg text-white" style={{ width: '5%' }}>
                                <input type="checkbox" onChange={handleSelectAllUsers}/>
                            </th>
                            <th scope="col" className="table-header-bg text-white" style={{ width: '10%' }}>#</th>
                            <th scope="col" className="table-header-bg text-white" style={{ width: '20%' }}>First Name</th>
                            <th scope="col" className="table-header-bg text-white" style={{ width: '20%' }}>Last Name</th>
                            <th scope="col" className="table-header-bg text-white" style={{ width: '30%' }}>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.userId}>
                                <td><input type="checkbox" onChange={() => handleCheckBoxToggle(user.email)} checked={deleteUsers.includes(user.email)} /></td>
                                <th scope="row">{user.userId}</th>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td style={{ overflowX: 'hidden' }}>{user.email}</td>
                                {/* <td>
                            </td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <InsertUserToCourseModal API_URL={apiUrl}
                show={showInsertUserToCourseModal} exceptUsers={users}
                onClose={() => { setShowInsertUserToCourseModal(false) }} />
            <DeleteUserFromCourseModal deleteUsers={deleteUsers} 
            show={showDeleteUserFromCourseModal} 
            onClose={() => {setShowDeleteUserFromCourseModal(false)}}/>

        </>

    );
}

const AdminCourseDetail = () => {
    const pathname = window.location.pathname;
    // Ex: /admin/course/Introduction%20to%20Python%20B
    const pathnameParts = pathname.split("/");
    const courseId = decodeURIComponent(pathnameParts[pathnameParts.length - 1]);
    const [students, setStudents] = useState<any[]>([])
    const [teachers, setTeachers] = useState<any[]>([])

    const api = useApi();
    const fetchStudentList = async () => {
        try {
            const response = await api.get(`/api/v1/course/${courseId}/students`);
            if (response.status == 200) {
                const students = response.data;
                setStudents(students)
            } else {
                throw new Error("Can't fetch this api")
            }

        } catch (err) {
            throw err;
        }

    }
    const fetchTeacherList = async () => {
        try {
            const response = await api.get(`/api/v1/course/${courseId}/teachers`);
            if (response.status == 200) {
                const teachers = response.data;
                setTeachers(teachers)
            } else {
                throw new Error("Can't fetch this api")
            }

        } catch (err) {
            throw err;
        }

    }

    useEffect(() => {
        fetchStudentList()
        fetchTeacherList()
    }, [])



    return (
        <>
            <div className="teacher-list">
                {teachers.length > 0 && <UserTable users={teachers} role='teacher' />}
            </div>

            <div className="student-list">
                {students.length > 0 && <UserTable users={students} role='student' />}
            </div>
        </>

    )
}

export default AdminCourseDetail