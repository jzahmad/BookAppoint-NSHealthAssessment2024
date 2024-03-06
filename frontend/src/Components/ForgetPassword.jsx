import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Styles/create.css';
import axios from 'axios'; // Import axios for making HTTP requests

function ForgetPassword() {
    const [healthId, setHealthId] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [showSecurityForm, setShowSecurityForm] = useState(false);
    const [messages, setMessages] = useState("");
    const [password, setPassword] = useState("");

    const dataValidation = () => {
        if (!healthId) {
            setMessages("Please enter your health card ID.");
            return false;
        }
        if (showSecurityForm && !securityAnswer) {
            setMessages("Please fill in both security question and answer.");
            return false;
        }
        setMessages("");
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!dataValidation()) {
            return;
        }
        try {
            // Make a POST request to your backend endpoint
            const response = await axios.post('http://localhost:80/forget', { healthId });
            const { securityQuestion, securityAnswer: storedSecurityAnswer, password: storedPassword } = response.data;
            setSecurityQuestion(securityQuestion);
            if (showSecurityForm && securityAnswer === storedSecurityAnswer) {
                setPassword(storedPassword);
            }
            setShowSecurityForm(true);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMessages("User not found with the provided health ID");
            } else {
                setMessages("Internal server error");
            }
        }
    };

    return (
        <div>
            <h2>Forget Password</h2>
            <div className="login-container">
                <Form onSubmit={handleSubmit} className="login-form">
                    <Form.Group>
                        <Form.Label>Enter Health Card:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Health Card"
                            value={healthId}
                            onChange={(e) => setHealthId(e.target.value)}
                        />
                    </Form.Group>
                    {showSecurityForm && (
                        <>
                            <Form.Group>
                                <Form.Label>Security Question:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={securityQuestion}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Security Answer:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Security Answer"
                                    value={securityAnswer}
                                    onChange={(e) => setSecurityAnswer(e.target.value)}
                                />
                            </Form.Group>
                            {password && <div>Password: {password}</div>}
                        </>
                    )}
                    {messages && <div style={{ color: 'red' }}>{messages}</div>}
                    <br />
                    <Button block size="lg" type="submit">
                        {showSecurityForm ? "Submit" : "Next"}
                    </Button>
                </Form>
                <br />
                <Link to="/">Go back to Login</Link>
            </div>
        </div>
    );
}

export default ForgetPassword;
