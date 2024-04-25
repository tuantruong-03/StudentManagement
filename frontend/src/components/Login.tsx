import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../hooks/AuthProvider';

function Login() {
    const [input, setInput] = useState({
        username: "",
        password: ""
    })

    // useContext(AuthProvider)
    const auth = useAuth()
    // Handle submit
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log("input " + input.username)
        // Retrive value from input
        // const username = event.target.username.value
        // const password = event.target.password.value
        if (input.username !== "" && input.password !== "") {
            auth.login(input);
        }
        else {
            alert("please provide a valid input");
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
        <div className="container">
            <div className="row">
                <Form className="col-8" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleInput} name="username" value={input.username} type="text" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleInput} name='password' value={input.password} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>


    )
}

export default Login;