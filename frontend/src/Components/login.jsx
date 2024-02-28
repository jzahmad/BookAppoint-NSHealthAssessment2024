import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Styles/login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email === "" || password === "") {
            console.log("fail: Email or password cannot be empty");
        } else if (email === "jz346475@dal.ca" && password === "world") {
            console.log("success: Logged in successfully");
            navigate('/homepage');
        } else {
            console.log("fail: Invalid email or password");
        }
    };
    

    return (
        <div>
            <h2>Welcome to Bookappoint</h2>
            <div className="login-container">
                <Form onSubmit={handleSubmit} className="login-form">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Button block size="lg" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;
