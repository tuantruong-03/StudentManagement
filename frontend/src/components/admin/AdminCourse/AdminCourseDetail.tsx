import { useEffect, useState } from "react";
import useApi from "../../../hooks/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import InsertTeacherToCourseModal from "../../modal/InsertTeacherToCourseModal";
import InsertStudentToCourseModal from "../../modal/InsertStudentToCourseModal";



interface UserTableProps {
    users: any[],

}

const UserTable = (props: UserTableProps) => {
    const { users } = props;

    // For modal
    const [showUpdateUserModal, setShowUpdateUserModal] = useState<boolean>(false)
    const [showDeleteUserModal, setShowDeleteUserModal] = useState<boolean>(false)
    const [deleteUser, setDeleteUser] = useState(null);
    const [updateUser, setUpdateUser] = useState(null);

    const handleDeleteButton = (user: any) => {
        setShowDeleteUserModal(true);
        setDeleteUser(user);
    }

    const handleUpdateButton = (user: any) => {
        setShowUpdateUserModal(true);
        setUpdateUser(user);
    }

    return (
        <div style={{ overflowX: 'auto', textAlign: 'center' }}>
            <Table bordered style={{ minWidth: '800px', tableLayout: 'fixed' }}>
                <thead className='thead'>
                    <tr>
                    <th scope="col" className="table-header-bg text-white" style={{ width: '5%' }}>
                            <input type="checkbox"  />
                            </th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '10%' }}>#</th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '20%' }}>First Name</th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '20%' }}>Last Name</th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '30%' }}>Email</th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '20%' }}>Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td><input type="checkbox" /></td>
                            <th scope="row">{index + 1}</th>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td style={{ overflowX: 'hidden' }}>{user.email}</td>
                            <td>
                                <button type="button" onClick={() => handleUpdateButton(user)} className="me-1 btn app-btn-primary" title="Update"><FontAwesomeIcon icon={faPen} /></button>
                                <button type="button" onClick={() => handleDeleteButton(user)} className="btn app-btn-primary" title="Delete"><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
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


  const [showInsertTeacherToCourseModal, setShowInsertTeacherToCourseModal] = useState<boolean>(false)
  const [showInsertStudentToCourseModal, setShowInsertStudentToCourseModal] = useState<boolean>(false)

    return (
        <>  
            <div className="teacher-list">
                <div className="d-flex align-items-center ">
                    <h1 >Teacher list </h1>
                    <button type="button" title="Create" onClick={() => setShowInsertTeacherToCourseModal(true)} className="ms-3 my-2 btn app-btn-primary">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                {teachers.length > 0 && <UserTable users={teachers} />}
                <InsertTeacherToCourseModal show={showInsertTeacherToCourseModal} exceptTeachers={teachers} onClose={() => {setShowInsertTeacherToCourseModal(false)}} />
                
            </div>

            <div className="student-list">
                <div className="d-flex align-items-center ">
                    <h1 >Student list </h1>
                    <button type="button" title="Create"  onClick={() => setShowInsertStudentToCourseModal(true)} className="ms-3 my-2 btn app-btn-primary">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>

                {students.length > 0 &&<UserTable users={students} />}
                <InsertStudentToCourseModal show={showInsertStudentToCourseModal} exceptStudents={students} onClose={() => {setShowInsertStudentToCourseModal(false)}} />

            </div>
        </>

    )
}

export default AdminCourseDetail