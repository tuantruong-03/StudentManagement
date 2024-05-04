import { useEffect, useRef, useState } from "react";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";
import UserTable from "./UserTable";
import { Button, Form, Modal } from "react-bootstrap";
import { ValidateNameOfUser, ValidateEmail } from "../../../utils/Validate";
import { useAuth } from "../../../hooks/AuthProvider";
import axios from "axios";



interface ModalProps {
    show: boolean;
    onClose: () => void;
}

const CreateModal = (props: ModalProps) => {
    const { show, onClose } = props;
    const [showCreateModal, setShowCreateModal] = useState<boolean>(show)
    const [input, setInput] = useState({
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

    useEffect(() => setShowCreateModal(show)
        , [show])
    // console.log(showCreateModal)
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
        setShowCreateModal(false);
        setInputValid({
            firstName: false,
            lastName: false,
            email: false,
        })
        setInput({
            firstName: '',
            lastName: '',
            email: ''
        })
        onClose(); // Inform the parent about the closure, it will trigger "showCreateModal" in "UserPagination" component
    }

    const handleSubmitButton = (event: any) => {
        event.preventDefault();
        console.log(input)
    }


    return (
        <>
            <Modal show={showCreateModal} onHide={handleCloseCreateModal} >
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
                            <Form.Control name="email" type="email" onChange={handleInput} placeholder="example@gmail.com" required />
                        </Form.Group>
                        {!inputValid.email && (<p className="text-secondary">Example: "example@gmail.com", "user123@sub.domain.com" </p>)}

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



interface UserPaginationProps {
    totalPage: number,
    usersByPageApi: string
}
const UserPagination = (props: UserPaginationProps) => {
    const auth = useAuth();
    const token = auth.token;

    const { totalPage, usersByPageApi } = props
    const pageRefs = useRef<HTMLButtonElement[]>([]);
    const [searchParams, setSearchParams] = useSearchParams()
    const [data, setData] = useState<any[]>([]);
    const pageInit = parseInt(searchParams.get('page') || '1'); // !null or '1'
    const [page, setPage] = useState<number>(pageInit);
    const size = 5;

    // Ensure the page state is always an integer when set
    useEffect(() => {
        const handleSearchParamChange = () => {
            const newPage = parseInt(searchParams.get('page') || '1', 10);
            setPage(newPage);
        };
        handleSearchParamChange();
    }, [searchParams]);

    // Fetch users by page
    useEffect(() => {
        async function fetchData() {
            try {
                    const response = await fetch(usersByPageApi + `?page=${page}`, {
                        method: 'GET',
                        // headers: {
                        //     'Authorization' : `Bearer ${token}`
                        // },
                    });
                const data = await response.json();
                setData(data)
            } catch(err) {
                throw err
            }
           
            // console.log(data)
        }
        fetchData()
    }, [page])


    const handlePage = (event: any) => {
        const page = event.target.textContent;
        setSearchParams({ 'page': page });
    }
    const handlePreviousPage = (event: any) => {
        const previousPage: number = page <= 1 ? totalPage : page - 1;
        setSearchParams({ 'page': previousPage.toString() });

    }

    const handleNextPage = (event: any) => {
        const nextPage: number = page >= totalPage ? 1 : page + 1;
        setSearchParams({ 'page': nextPage.toString() });
    }

    // For modal
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
    return <>
        <button type="button" title="Create" onClick={() => setShowCreateModal(true)} className="me-1 btn btn-outline-primary">
            <FontAwesomeIcon icon={faPlus} />
        </button>
        <UserTable users={data} size={size} page={page} />
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item"><button className="page-link" onClick={handlePreviousPage}>Previous</button></li>
                {/* Generate page */}
                {Array.from({ length: totalPage }, (_, index) => (
                    <li key={index} className="page-item">
                        <button ref={el => pageRefs.current[index + 1] = el as HTMLButtonElement}
                            onClick={handlePage} className={`page-link ${page == index + 1 ? 'active' : ''}`}>{index + 1}</button>
                    </li>
                ))}
                {/*  */}
                <li className="page-item"><button className="page-link" onClick={handleNextPage}>Next</button></li>
            </ul>
        </nav>
        <CreateModal show={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </>
}

export default UserPagination;