import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Styles/create.css';
import axios from 'axios';

function CreateAccount() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [healthId, setHealthId] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [messages, setMessages] = useState("");

    const url="http://localhost:80";
    const navigate=useNavigate();

    const securityQuestions = [
        "What is your mother's maiden name?",
        "What city were you born in?",
        "What is the name of your first pet?",
        "What is your favorite movie?"
    ];

    const dataValidation = () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    
        if (!emailRegex.test(email)) {
            setMessages("Please enter a valid email address.");
        } else if (password.length < 8) {
            setMessages("Password should be at least 8 characters long.");
        } else if (confirmPassword !== password) {
            setMessages("Passwords should match");
        } else if (healthId.length !== 10 || !Number.isInteger(Number(healthId))) {
            setMessages("Please enter a valid health id");
        } else if (!securityQuestion) {
            setMessages("Please select one of the security question");
        } else if (!securityAnswer) {
            setMessages("Please fill in a security answer.");
        } else {
            setMessages("");
            return true; 
        }
        return false; 
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!dataValidation()) {
            return;
        }
    
        const formData = { 
            email: email, 
            password: password, 
            healthId: healthId, 
            securityQuestion: securityQuestion, 
            securityAnswer: securityAnswer 
        };
    
        try {
            await axios.post(`${url}/CreateUser`, formData);
            setMessages("Account Created Successfully. Go back to login")
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setMessages(error.response.data.error);
            } else {
                setMessages("An error occurred while creating the user.");
            }
        }
    };
    
    

    return (
        <div>
            <h2>Create an Account</h2>
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
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicHealthId">
                        <Form.Label>Health ID</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Health ID"
                            value={healthId}
                            onChange={(e) => setHealthId(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicSecurityQuestion">
                        <Form.Label>Security Question</Form.Label>
                        <Form.Select
                            value={securityQuestion}
                            onChange={(e) => setSecurityQuestion(e.target.value)}>
                            <option>Select a security question...</option>
                            {securityQuestions.map((question, index) => (
                                <option key={index} value={question}>{question}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formBasicSecurityAnswer">
                        <Form.Label>Security Answer</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Security Answer"
                            value={securityAnswer}
                            onChange={(e) => setSecurityAnswer(e.target.value)}
                        />
                    </Form.Group>
                    {messages && <div style={{ color: 'red' }}>{messages}</div>}
                    <br/>
                    <Button block size="lg" type="submit">
                        Create Account
                    </Button>
                </Form>
                <br />
                <Link to="/">Go back to Login</Link>
            </div>
        </div>
    );
}

export default CreateAccount;
