import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'; // Import Axios
import '../Styles/login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [messages, setMessages] = useState("");
    const navigate = useNavigate(); 

    const url="http://localhost:80";

    const handleValidation = () => {
        if (!email.trim()) {
            setMessages("Enter a valid email!");
        } else if (!password.trim()) {
            setMessages("Enter a valid password");
            return false;
        } else {
            setMessages("");
            return true;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!handleValidation()) {
            return;
        }
        try {
            const response = await axios.post(`${url}/login`, { email, password });
            navigate("/homepage");
        } catch (error) {
            setMessages(error.response.data);
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
                    {messages && <p className="error-message">{messages}</p>}
                    <Button block size="lg" type="submit">
                        Login
                    </Button>
                </Form>
                
                <br/>
                <div className="links-container">
                    <Link to="/create" className="link">Create Account</Link>
                    <Link to="/forget" className="link">Forget Password</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
