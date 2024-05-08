import { useEffect, useState } from "react";
import useApi from "../../hooks/Api";
import { Button, Form, Modal } from "react-bootstrap";

interface DeleteCourseModal {
    show: boolean;
    onClose: () => void;
    course: any;
}



const DeleteCourseModal = (props: DeleteCourseModal) => {
    const api = useApi();
    const { show, onClose, course } = props;
    const [showModal, setShowModal] = useState<boolean>(show)


    useEffect(() => setShowModal(show)
    
        , [show])
    // console.log(showModal)
    

    const handleCloseModal = () => {
        setShowModal(false);
        onClose(); // Inform the parent about the closure, it will trigger "showModal" in "coursePagination" component
    }

    const handleSubmitButton = async (event: any) => {
        console.log(course)
        const payload = {
            name: course.name
        }

        event.preventDefault();
        try {
            const response = await api.post("/admin/course/delete", payload)
            if (response.status == 200) {
                window.location.reload();
            }
        } catch(err) {
            console.log('Errors: ', err);
        }
    }


    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Delete course</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        Are you sure to delete this course?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmitButton}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default DeleteCourseModal