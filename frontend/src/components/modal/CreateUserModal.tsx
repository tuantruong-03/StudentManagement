import { useEffect, useState } from "react";
import useApi from "../../hooks/Api";
import { ValidateEmail, ValidateNameOfUser } from "../../utils/Validate";
import { Button, Form, Modal } from "react-bootstrap";
import { useLocation } from "react-router";
import { toast } from "react-toastify";

interface CreateUserModalProps {
    show: boolean;
    onClose: () => void;
}

const identifyRole = (path: string): string => {
    if (path.includes('teacher')){
         return "ROLE_TEACHER";
        }
    if (path.includes('student')) {
        return "ROLE_STUDENT";
    }
    return "unknown";
}

const CreateUserModal = (props: CreateUserModalProps) => {
    const api = useApi();
    const location = useLocation();
    const role = identifyRole(location.pathname);   // To identify if we create teacher of student
    const { show, onClose } = props;
    const [showModal, setShowModal] = useState<boolean>(show)
    const [input, setInput] = useState({
        role: role,
        firstName: '',
        lastName: '',
        email: ''
    })
    const [isValidForm, setIsValidForm] = useState<boolean>(false)
    const [inputValid, setInputValid] = useState({
        firstName: false,
        lastName: false,
        email: false,
    })

    useEffect(() => setShowModal(show)
        , [show])
    // console.log(showModal)
    useEffect(() => {
        let isValid: boolean = Object.values(inputValid).every(input => input == true);
        setIsValidForm(isValid)
    }, [inputValid])
    const handleInput = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name == 'firstName' || name == 'lastName') {
            setInputValid(prevInputValid => ({
                ...prevInputValid,
                [name]: ValidateNameOfUser(value) // 
            }))

        }
        if (name == 'email') {
            setInputValid(prevInputValid => ({
                ...prevInputValid,
                [name]: ValidateEmail(value) // 
            }))
        }
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }))
    }

    const handleCloseCreateModal = () => {
        setShowModal(false);
        setInputValid({
            firstName: false,
            lastName: false,
            email: false,
        })
        setInput({
            role: role,
            firstName: '',
            lastName: '',
            email: ''
        })
        onClose(); // Inform the parent about the closure, it will trigger "showModal" in "UserPagination" component
    }

    const handleSubmitButton = async (event: any) => {
        event.preventDefault();
        console.log(input)
        try {
            const response = await api.post(`/admin/user`, input);
            if (response.status == 201) { // HttpStatus.CREATED
                onClose()
                window.location.reload();
            } 

        } catch(err) {  // Email must be unique
            console.log(err)
            toast.error("Email is used by another user"); // Notify the user of the error
            alert("Email is used by another user")
        }
    }


    return (
        <>
            <Modal show={showModal} onHide={handleCloseCreateModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Create user</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control name="firstName" type="text" onChange={handleInput} placeholder="First" required />
                        </Form.Group>
                        {!inputValid.firstName && (<p className="text-secondary">The fist name must only contain letters and the first letter must be capitalized!</p>)}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name="lastName" type="text" onChange={handleInput} placeholder="Last" required />
                        </Form.Group>
                        {!inputValid.lastName && (<p className="text-secondary">The last name must only contain letters and the first letter must be capitalized!</p>)}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" onChange={handleInput} placeholder='username@example.com' required />
                        </Form.Group>
                        {!inputValid.email && (<p className="text-secondary">Example: "user@example.com", "user123@sub.domain.com".</p>)}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCreateModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmitButton} disabled={!isValidForm}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default CreateUserModal