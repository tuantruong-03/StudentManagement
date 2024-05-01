import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../hooks/AuthProvider';
import Cookies from 'js-cookie';

function Login() {
    const [input, setInput] = useState({
        username: "",
        password: ""
    })
    const [inputError, setInputError] = useState("")

    // useContext(AuthProvider)
    const auth = useAuth()
    // Handle submit
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        // Retrive value from input
        // const username = event.target.username.value
        // const password = event.target.password.value
        if (input.username !== "" && input.password !== "") {
            try {
                const msg = await auth.login(input);
                if (msg) {
                    setInputError(msg.toString());  // Set the error message if login failed
                } 
            } catch (err) {
                console.error("Error during login:", err);
                setInputError('Login failed due to unexpected error.'); // Set a general error message
            }
        }
        else {
            alert("Please provide a valid input");
        }
    }

    // Handle input
    const handleInput = (event: any) => {
        const { name, value } = event.target;
        // Prev is "previousInput"
        setInput((previousInput) => {
            return {
                ...previousInput,
                [name]: value
            }
        })
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h3 className="card-title mb-4">Login</h3>
                            <p className="text-danger">{inputError}</p>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    {/* <Form.Label>Username</Form.Label> */}
                                    <Form.Control
                                        onChange={handleInput}
                                        name="username" 
                                        value={input.username}
                                        type="text"
                                        placeholder="Enter username"
                                        className="form-control-lg"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    {/* <Form.Label>Password</Form.Label> */}
                                    <Form.Control
                                        onChange={handleInput}
                                        name="password"
                                        value={input.password}
                                        type="password"
                                        placeholder="Password"
                                        className="form-control-lg"
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="btn-lg btn-block">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Login;