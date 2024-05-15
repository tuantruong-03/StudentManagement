import { useEffect, useState } from "react";
import useApi from "../../hooks/Api";
import { Button, Form, Modal } from "react-bootstrap";
import { useLocation } from "react-router";

interface DeleteUsersFromCourseModalProps {
    show: boolean;
    onClose: () => void;
    deleteUsers: string[];
}



const DeleteUsersFromCourseModal = (props: DeleteUsersFromCourseModalProps) => {
    const pathname = window.location.pathname;
    // Ex: /admin/course/Introduction%20to%20Python%20B
    const pathnameParts = pathname.split("/");
    const courseId = decodeURIComponent(pathnameParts[pathnameParts.length - 1]);

    const api = useApi();
    const { show, onClose, deleteUsers } = props;
    const [showModal, setShowModal] = useState<boolean>(show)

    useEffect(() => setShowModal(show)
    
        , [show])
    // console.log(showModal)
    

    const handleCloseModal = () => {
        setShowModal(false);
        onClose(); // Inform the parent about the closure, it will trigger "showModal" in "usersPagination" component
    }

    const handleSubmitButton = async (event: any) => {
        console.log(deleteUsers)
        event.preventDefault();
        try {
            const response = await api.post(`/admin/course/${courseId}/deleteUser`, deleteUsers);
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
                    <Modal.Title>Delete users</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        Are you sure to delete this users?
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

export default DeleteUsersFromCourseModal