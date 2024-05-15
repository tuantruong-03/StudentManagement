import { useEffect, useState } from "react";
import useApi from "../../hooks/Api";
import { Button, Form, FormControl, InputGroup, Modal, Table } from "react-bootstrap";

interface UserTableProps {
    users: any[],
    onSelectUser: (selectedUsers: any) => void,
}


const UserTable = (props: UserTableProps) => {
    const { users, onSelectUser } = props;
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])  // Just insert on ly email
    const [displayedUsers, setDisplayedUsers] = useState<any[]>(users) 

    const handleCheckBoxToggle = (userEmail: string) => {
        if (selectedUsers.includes(userEmail)) {
            setSelectedUsers(selectedUsers.filter(email => email !== userEmail))
        } else {
            setSelectedUsers([...selectedUsers, userEmail])
        }
    }
    const handleSelectAllToggle = () => {
        if (selectedUsers.length < users.length) {    // Select all
            const userEmails = users.map(user => user.email)
            setSelectedUsers(userEmails)
        } else { // Deselect all
            setSelectedUsers([])
        }
    }
    const handleSearch = (event: any) => {
        const q = event.target.value.toLowerCase(); // query
        const displayedUsers = users.filter(user => user.email.toLowerCase().includes(q) 
                    || (user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()).includes(q)) // example: "jane doe" includes "jane d  "
        console.log(q)
        setDisplayedUsers(displayedUsers)
    }

    useEffect(() => {
        onSelectUser(selectedUsers)
    }, [selectedUsers])

    return (
        <>
        <input type="text" className="p-1 mb-2 input-search" onChange={handleSearch} placeholder="Search..." />
        <div style={{ overflowX: 'auto', textAlign: 'center' }}>
            <Table bordered style={{ minWidth: '600px', tableLayout: 'fixed' }}>
                <thead className='thead'>
                    <tr>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '5%' }}>
                            <input type="checkbox" checked={selectedUsers.length == users.length} onChange={handleSelectAllToggle} />
                        </th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '10%' }}>#</th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '20%' }}>First Name</th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '20%' }}>Last Name</th>
                        <th scope="col" className="table-header-bg text-white" style={{ width: '50%' }}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedUsers.map((user, index) => (
                        <tr key={index}>
                            <td><input type="checkbox" onChange={() => handleCheckBoxToggle(user.email)} checked={selectedUsers.includes(user.email)} /></td>
                            <th scope="row">{user.userId}</th>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td style={{ overflowX: 'hidden' }}>{user.email}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        </>
    );
}

interface InsertUserToCourseModalProps {
    API_URL: string,
    show: boolean,
    exceptUsers: any[];
    onClose: () => void,
}

const InsertUserToCourseModal = (props: InsertUserToCourseModalProps) => {
    const pathname = window.location.pathname;
    // Ex: /admin/course/Introduction%20to%20Python%20B
    const pathnameParts = pathname.split("/");
    const courseId = decodeURIComponent(pathnameParts[pathnameParts.length - 1]);

    const api = useApi();
    const { exceptUsers, show, onClose, API_URL } = props // List of users is already in the course
    const [users, setUsers] = useState<any[]>([]) // List of users is not in the course
    const [showModal, setShowModal] = useState<boolean>(show)

    const fetchAllUsers = async () => {
        try {
            const response = await api.get(API_URL);
            if (response.status == 200) {
                const allUsers = response.data
                // console.log('allUsers ', allUsers)
                const insertableUsers = allUsers.filter((user: any) => !exceptUsers.some(exceptUser => exceptUser.email === user.email))
                setUsers(insertableUsers)

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
        console.log(selectedUsers)
        try {
            const response = await api.post(`/admin/course/${courseId}/insertUser`, selectedUsers);

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
        fetchAllUsers()
    }, [])

    const [selectedUsers, setSelectedUsers] = useState<string[]>([])  // Use email to identify that user
    const handleOnSelectUser = (selectedUsers: string[]) => {
        setSelectedUsers(selectedUsers)
    }

    return <>
        {/* Search input */}

        <Modal show={showModal} onHide={handleCloseModal} size="lg" >

            <Modal.Header closeButton>
                <Modal.Title>Insert to course</Modal.Title>
                
            </Modal.Header>
            
            <Modal.Body>
               
                {/* Table for selecting users */}
                <UserTable users={users} onSelectUser={handleOnSelectUser} />

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmitButton} disabled={selectedUsers.length == 0}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}
export default InsertUserToCourseModal;
