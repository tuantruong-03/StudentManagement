import { useEffect, useState } from "react";
import useApi from "../../hooks/Api";
import { Button, Form, Modal } from "react-bootstrap";
import { useLocation } from "react-router";

interface DeleteUserFromCourseModalProps {
    show: boolean;
    onClose: () => void;
    deleteUsers: any[];
}



const DeleteUserFromCourseModal = (props: DeleteUserFromCourseModalProps) => {
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
        onClose(); // Inform the parent about the closure, it will trigger "showModal" 
    }
    const handleSubmitButton = async () => {
        console.log("deleteUsers ", deleteUsers);
        try {
            const response = await api.post(`/admin/course/${courseId}/deleteUser`,deleteUsers);
            if (response.status == 200) {
                window.location.reload();
            }
            
        } catch(err) {
            throw err;
        }
    }


    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        Are you sure to delete these users from course?
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

export default DeleteUserFromCourseModal