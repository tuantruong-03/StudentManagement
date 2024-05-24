import { useEffect, useState } from "react";
import useApi from "../../../hooks/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import InsertTeacherToCourseModal from "../../modal/InsertTeacherToCourseModal";
import InsertStudentToCourseModal from "../../modal/InsertStudentToCourseModal";
import DeleteUserFromCourseModal from "../../modal/DeleteUserFromCourseModal";



interface UserTableProps {
    users: any[],
    onSelectUsers: (selectUsers: any[]) => void
}

const UserTable = (props: UserTableProps) => {
    const { users, onSelectUsers } = props;
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    // For modal



    const handleSelectAllToggle = () => { 
        if (selectedUsers.length < users.length) {    // Select all
            const userEmails = users.map(user => user.email)
            setSelectedUsers(userEmails)
        } else { // Deselect all
            setSelectedUsers([])
        }
    }

    const handleCheckBoxToggle = (userEmail: string) => {
        if (selectedUsers.includes(userEmail)) {
            setSelectedUsers(selectedUsers.filter(email => email !== userEmail))
        } else {
            setSelectedUsers([...selectedUsers, userEmail])
        }
    }

    useEffect(() => {
        onSelectUsers(selectedUsers);
    }, [selectedUsers])

    return (
        <>
        <div style={{ overflowX: 'auto', textAlign: 'center' }}>
            <Table bordered style={{ minWidth: '800px', tableLayout: 'fixed' }}>
                <thead className='thead'>
                    <tr>
                    <th scope="col" className="table-header-bg text-white" style={{ width: '5%' }}>
                            <input type="checkbox" onChange={handleSelectAllToggle} checked={selectedUsers.length == users.length}  />
                            </th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '10%' }}>ID</th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '20%' }}>First Name</th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '20%' }}>Last Name</th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '30%' }}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.userId}>
                            <td><input type="checkbox" onChange={() => handleCheckBoxToggle(user.email)} checked={selectedUsers.includes(user.email)} /></td>
                            <th scope="row">{user.userId}</th>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td style={{ overflowX: 'hidden' }}>{user.email}</td>
                            {/* <td>
                                <button type="button" onClick={() => handleDeleteButton(user)} className="btn app-btn-primary" title="Delete"><FontAwesomeIcon icon={faTrash} /></button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
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
    const [deleteStudents, setDeleteStudents] = useState<any[]>([])
    const [deleteTeachers, setDeleteTeachers] = useState<any[]>([])

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
  const [showDeleteUserFromCourseModal, setShowDeleteUserFromCourseModal] = useState<boolean>(false)

    return (
        <>  
            <div className="teacher-list">
                <div className="d-flex align-items-center ">
                    <h1 >List of teachers </h1>
                    <button type="button" title="Create" onClick={() => setShowInsertTeacherToCourseModal(true)} className="ms-3 my-2 btn app-btn-primary">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button type="button" onClick={() => setShowDeleteUserFromCourseModal(true)} hidden={deleteTeachers.length == 0} className="ms-2 btn app-btn-primary" title="Delete">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>

                </div>
                {teachers.length > 0 && <UserTable users={teachers} onSelectUsers={(selectUsers) =>  setDeleteTeachers(selectUsers)}  />}
                <InsertTeacherToCourseModal show={showInsertTeacherToCourseModal} exceptTeachers={teachers} onClose={() => {setShowInsertTeacherToCourseModal(false)}} />
                <DeleteUserFromCourseModal show={showDeleteUserFromCourseModal} onClose={() => {setShowDeleteUserFromCourseModal(false)}} deleteUsers={deleteTeachers}/>
                
            </div>

            <div className="student-list">
                <div className="d-flex align-items-center ">
                    <h1 >List of students </h1>
                    <button type="button" title="Create"  onClick={() => setShowInsertStudentToCourseModal(true)} className="ms-3 my-2 btn app-btn-primary">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button type="button" onClick={() => setShowDeleteUserFromCourseModal(true)} hidden={deleteStudents.length == 0} className="ms-2 btn app-btn-primary" title="Delete"><FontAwesomeIcon icon={faTrash} /></button>
                </div>

                {students.length > 0 &&<UserTable users={students} onSelectUsers={(selectUsers) =>  setDeleteStudents(selectUsers)}  />}
                <InsertStudentToCourseModal show={showInsertStudentToCourseModal} exceptStudents={students} onClose={() => {setShowInsertStudentToCourseModal(false)}} />

            </div>
        </>

    )
}

export default AdminCourseDetail