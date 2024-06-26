import { useEffect, useState } from "react";
import useApi from "../../hooks/Api";
import { Button, Form, Modal } from "react-bootstrap";
import { useLocation } from "react-router";

interface DeleteUserModal {
    show: boolean;
    onClose: () => void;
    user: any;
}



const DeleteUserModal = (props: DeleteUserModal) => {
    const api = useApi();
    const location = useLocation();
    const { show, onClose, user } = props;
    const [showModal, setShowModal] = useState<boolean>(show)


    useEffect(() => setShowModal(show)
    
        , [show])
    // console.log(showModal)
    

    const handleCloseModal = () => {
        setShowModal(false);
        onClose(); // Inform the parent about the closure, it will trigger "showModal" in "UserPagination" component
    }

    const handleSubmitButton = async (event: any) => {
        console.log(user)
        const payload = {
            email: user.email
        }

        event.preventDefault();
        try {
            const response = await api.post("/admin/user/delete", payload)
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
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        Are you sure to delete this user?
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

export default DeleteUserModal