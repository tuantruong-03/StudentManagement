import { useEffect, useState } from "react";
import useApi from "../../hooks/Api";
import { Button, Form, FormControl, InputGroup, Modal, Table } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

interface StudentTableProps {
    students: any[],
    onSelectStudent: (selectedStudents: any) => void,
}


const StudentTable = (props: StudentTableProps) => {
    const { students, onSelectStudent } = props;
    const [selectedStudents, setSelectedStudents] = useState<string[]>([])  // Just insert on ly email
    const [displayedStudents, setDisplayedStudents] = useState<any[]>(students) 

    const handleCheckBoxToggle = (studentEmail: string) => {
        if (selectedStudents.includes(studentEmail)) {
            setSelectedStudents(selectedStudents.filter(email => email !== studentEmail))
        } else {
            setSelectedStudents([...selectedStudents, studentEmail])
        }
    }
    const handleSelectAllToggle = () => {
        if (selectedStudents.length < students.length) {    // Select all
            const studentEmails = students.map(student => student.email)
            setSelectedStudents(studentEmails)
        } else { // Deselect all
            setSelectedStudents([])
        }
    }
    const handleSearch = (event: any) => {
        const q = event.target.value.toLowerCase(); // query
        const displayedStudents = students.filter(student => student.email.toLowerCase().includes(q) 
                    || student.firstName.toLowerCase().includes(q) 
                    || student.lastName.toLowerCase().includes(q))
        setDisplayedStudents(displayedStudents)
    }

    useEffect(() => {
        onSelectStudent(selectedStudents)
    }, [selectedStudents])

    return (
        <>
        <input type="text" className="p-1 mb-2 input-search" onChange={handleSearch} placeholder="Search ..." />
        <div style={{ overflowX: 'auto', textAlign: 'center' }}>
            <Table bordered style={{ minWidth: '600px', tableLayout: 'fixed' }}>
                <thead className='thead'>
                    <tr>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '5%' }}>
                            <input type="checkbox" checked={selectedStudents.length == students.length} onChange={handleSelectAllToggle} />
                        </th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '10%' }}>#</th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '20%' }}>First Name</th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '20%' }}>Last Name</th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '50%' }}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedStudents.map((student, index) => (
                        <tr key={index}>
                            <td><input type="checkbox" onChange={() => handleCheckBoxToggle(student.email)} checked={selectedStudents.includes(student.email)} /></td>
                            <th scope="row">{index + 1}</th>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td style={{ overflowX: 'hidden' }}>{student.email}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        </>
    );
}

interface InsertStudentToCourseModalProps {
    show: boolean,
    exceptStudents: any[];
    onClose: () => void,
}

const InsertStudentToCourseModal = (props: InsertStudentToCourseModalProps) => {
    const pathname = window.location.pathname;
    // Ex: /admin/course/Introduction%20to%20Python%20B
    const pathnameParts = pathname.split("/");
    const courseId = decodeURIComponent(pathnameParts[pathnameParts.length - 1]);

    const api = useApi();
    const { exceptStudents, show, onClose } = props // List of students is already in the course
    const [students, setStudents] = useState<any[]>([]) // List of students is not in the course
    const [showModal, setShowModal] = useState<boolean>(show)

    const fetchAllstudents = async () => {
        try {
            const response = await api.get(`/api/v1/allStudents`);
            if (response.status == 200) {
                const allstudents = response.data
                const insertablestudents = allstudents.filter((student: any) => !exceptStudents.some(exceptstudent => exceptstudent.email === student.email))
                setStudents(insertablestudents)

            } else {
                throw new Error("Can't fetch this api")
            }

        } catch (err) {
            throw err;
        }

    }

    const handleCloseModal = () => {
        setShowModal(false)
        onClose()
    }

    const handleSubmitButton = async () => {
        console.log(selectedStudents)
        try {
            const response = await api.post(`/admin/course/${courseId}/insertUser`, selectedStudents);

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
        fetchAllstudents()
    }, [])

    const [selectedStudents, setSelectedStudents] = useState<string[]>([])  // Use email to identify that student
    const handleOnSelectStudent = (selectedStudents: string[]) => {
        setSelectedStudents(selectedStudents)
    }

    return <>
        {/* Search input */}

        <Modal show={showModal} onHide={handleCloseModal} size="lg" >

            <Modal.Header closeButton>
                <Modal.Title>Insert students to course</Modal.Title>
                
            </Modal.Header>
            
            <Modal.Body>
               
                {/* Table for selecting students */}
                <StudentTable students={students} onSelectStudent={handleOnSelectStudent} />

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmitButton} disabled={selectedStudents.length == 0}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}
export default InsertStudentToCourseModal;
