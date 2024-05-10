import { useEffect, useState } from "react";
import useApi from "../../hooks/Api";
import { ValidateEmail } from "../../utils/Validate";
import { Button, Form, Modal } from "react-bootstrap";
import { useLocation } from "react-router";
import { toast } from "react-toastify";

interface UpdateCourseModalProps {
    course: any;
    show: boolean;
    onClose: () => void;
}


const UpdateCourseModal = (props: UpdateCourseModalProps) => {
    const api = useApi();
    const { show, onClose, course } = props;  // First render, "course" is null
    const [showModal, setShowModal] = useState<boolean>(show)
    const [input, setInput] = useState({
        courseId: 0,
        name: '',
        maxNumberOfStudent: 0,
    })

    useEffect(() => {
        setInput({
            courseId: course?.courseId,
            name: course?.name,
            maxNumberOfStudent: course?.maxNumberOfStudent,
        })
        console.log(course)

    }, [course])


    const [isValidForm, setIsValidForm] = useState<boolean>(false)
    const [inputValid, setInputValid] = useState({
        maxNumberOfStudent: true,
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
            maxNumberOfStudent: true,
        })
        setInput({
            courseId: course?.courseId,
            name: course?.name,
            maxNumberOfStudent: course?.maxNumberOfStudent

        })
        onClose(); // Inform the parent about the closure, it will trigger "showModal" in "coursePagination" component
    }

    const handleSubmitButton = async (event: any) => {
        event.preventDefault();
        console.log(input)
        try {
            const response = await api.post(`/admin/course/put`, input);
            console.log(response.status)
            if (response.status == 200) { // HttpStatus.OK
                window.location.reload();
            }

        } catch (err) {
            console.log(err)
            alert("Invalid course")
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
                            <Form.Control name="name" type="text" value={input.name} onChange={handleInput} placeholder="Course name" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Max number of student</Form.Label>
                            <Form.Control name="maxNumberOfStudent" value={input.maxNumberOfStudent} type="number" onChange={handleInput} placeholder="50" required />
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

export default UpdateCourseModal