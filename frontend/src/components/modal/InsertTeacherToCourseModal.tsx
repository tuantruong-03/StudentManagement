import { useEffect, useState } from "react";
import useApi from "../../hooks/Api";
import { Button, Modal, Table } from "react-bootstrap";

interface TeacherTableProps  {
    teachers: any[],
    onSelectTeacher: (selectedTeachers: any) => void,
}


const TeacherTable = (props : TeacherTableProps) => {
    const {teachers, onSelectTeacher} = props;
    const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])  // Just insert on ly email 
    const [displayedTeachers, setDisplayedTeachers] = useState<any[]>(teachers)
    // console.log("displayedTeachers ", displayedTeachers)
    const handleCheckBoxToggle = (teacherEmail: string) => {
        if (selectedTeachers.includes(teacherEmail)) {
            setSelectedTeachers(selectedTeachers.filter(email => email !== teacherEmail))
        } else {
            setSelectedTeachers([...selectedTeachers, teacherEmail])
        }
    }
    const handleSelectAllToggle = () => { 
        if (selectedTeachers.length < teachers.length) {    // Select all
            const teacherEmails = teachers.map(teacher => teacher.email)
            setSelectedTeachers(teacherEmails)
        } else { // Deselect all
            setSelectedTeachers([])
        }
    }
    const handleSearch = (event: any) => {
        const q = event.target.value.toLowerCase(); // query
        const displayedStudents = teachers.filter(student => student.email.toLowerCase().includes(q) 
                    || student.firstName.toLowerCase().includes(q) 
                    || student.lastName.toLowerCase().includes(q))
        setDisplayedTeachers(displayedStudents)
    }
    useEffect(() => {
        onSelectTeacher(selectedTeachers)
    }, [selectedTeachers])

    return (
        <>
        <input type="text" className="p-1 mb-2 input-search" onChange={handleSearch} placeholder="Search ..." />

        <div style={{ overflowX: 'auto', textAlign: 'center' }}>
            <Table bordered style={{ minWidth: '600px', tableLayout: 'fixed' }}>
                <thead className='thead'>
                    <tr>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '5%' }}>
                            <input type="checkbox" checked={selectedTeachers.length == teachers.length} onChange={handleSelectAllToggle} />
                            </th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '10%' }}>ID</th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '20%' }}>First Name</th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '20%' }}>Last Name</th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '50%' }}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedTeachers.map((teacher, index) => (
                        <tr key={teacher.userId}>
                            <td><input type="checkbox" onChange={() => handleCheckBoxToggle(teacher.email)} checked={selectedTeachers.includes(teacher.email)} /></td>
                            <th scope="row">{teacher.userId}</th>
                            <td>{teacher.firstName}</td>
                            <td>{teacher.lastName}</td>
                            <td style={{ overflowX: 'hidden' }}>{teacher.email}</td>
    
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        </>
    );
}

interface InsertTeacherToCourseModalProps {
    show: boolean,
    exceptTeachers: any[];
    onClose: () => void,
}

const InsertTeacherToCourseModal = (props: InsertTeacherToCourseModalProps) => {
    const pathname = window.location.pathname;
    // Ex: /admin/course/Introduction%20to%20Python%20B
    const pathnameParts = pathname.split("/");
    const courseId = decodeURIComponent(pathnameParts[pathnameParts.length - 1]);

    const api = useApi();
    const { exceptTeachers, show, onClose } = props // List of teachers is already in the course
    const [teachers, setTeachers] = useState<any[]>([]) // List of teachers is not in the course
    const [showModal, setShowModal] = useState<boolean>(show)



  

    const handleCloseModal = () => {
        setShowModal(false)
        onClose()
    }

    const handleSubmitButton = async () => {
        console.log(selectedTeachers)
        try {
            const response = await api.post(`/admin/course/${courseId}/insertUser`,selectedTeachers);

            if (response.status == 200) {
                window.location.reload();

            } else {
                throw new Error("Can't fetch this api")
            }

        } catch (err) {
            throw err;
        }
    }

 
    useEffect(() => {
        setShowModal(show)
    }, [show])
    useEffect(() => {
        const fetchAllTeachers = async () => {
            try {
                const response = await api.get(`/api/v1/allTeachers`);
                if (response.status == 200) {
                    const allTeachers = response.data
                    const insertableTeachers = allTeachers.filter((teacher: any) => exceptTeachers.every(exceptTeacher => exceptTeacher.email !== teacher.email))
                    setTeachers(insertableTeachers)
    
                } else {
                    throw new Error("Can't fetch this api")
                }
    
            } catch (err) {
                throw err;
            }
    
        }
        fetchAllTeachers()
    }, [exceptTeachers])

    const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])  // Use email to identify that teacher
    const handleOnSelectTeacher = (selectedTeachers: string[]) => {
        setSelectedTeachers(selectedTeachers)
    }

    return <>
        <Modal show={showModal} onHide={handleCloseModal} size="lg" >
            <Modal.Header closeButton>
                <Modal.Title>Insert Teachers to course</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* Table for selecting teachers */}
                <TeacherTable teachers={teachers}  onSelectTeacher= {handleOnSelectTeacher} /> 

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick = {handleSubmitButton} disabled={selectedTeachers.length == 0}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}
export default InsertTeacherToCourseModal;
