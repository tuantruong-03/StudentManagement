import { useEffect, useState } from "react";
import useApi from "../../hooks/Api";
import { ValidateEmail, ValidateNameOfUser } from "../../utils/Validate";
import { Button, Form, Modal } from "react-bootstrap";
import { useLocation } from "react-router";
import { toast } from "react-toastify";

interface CreateCourseModalProps {
    show: boolean;
    onClose: () => void;
}

const CreateCourseModal = (props: CreateCourseModalProps) => {
    const api = useApi();
    const { show, onClose } = props;
    const [showModal, setShowModal] = useState<boolean>(show)
    const [input, setInput] = useState({
        name: '',
        maxNumberOfStudent: 0,
    })
    const [isValidForm, setIsValidForm] = useState<boolean>(false)
    const [inputValid, setInputValid] = useState({
        maxNumberOfStudent: false,
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
        if (name == 'maxNumberOfStudent') {
            setInputValid(prevInputValid => ({
                ...prevInputValid,
                [name]: value > 0 && value < 120 // 
            }))
        }
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }))
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setInputValid({
            maxNumberOfStudent: false,
        })
        setInput({
            name: '',
            maxNumberOfStudent: 0,
        })
        onClose(); // Inform the parent about the closure, it will trigger "showModal" in "UserPagination" component
    }

    const handleSubmitButton = async (event: any) => {
        event.preventDefault();
        console.log(input)
        try {
            const response = await api.post(`/admin/course`, input);
            if (response.status == 201) { // HttpStatus.CREATED
                window.location.reload();
            } 

        } catch(err) {  // Email must be unique
            console.log(err)
            toast.error("Course is created before!"); // Notify the user of the error
            alert("Course is created before!")
        }
    }


    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Create course</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" type="text" onChange={handleInput} placeholder="Course name" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Max number of student</Form.Label>
                            <Form.Control name="maxNumberOfStudent" type="text" onChange={handleInput} placeholder="50" required />
                        </Form.Group>
                        {!inputValid.maxNumberOfStudent && (<p className="text-secondary">Max number has to be greater than zero and less than 120</p>)}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
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

export default CreateCourseModal