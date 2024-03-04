import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Styles/create.css';

function ForgetPassword() {
    const [healthId, setHealthId] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("What is your favourite movie?");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [showSecurityForm, setShowSecurityForm] = useState(false);
    const [messages, setMessages] = useState("");

    const dataValidation = () => {
        if (!healthId) {
            setMessages("Please enter your health card ID.");
            return;
        }
        if (showSecurityForm && (!securityAnswer)) {
            setMessages("Please fill in both security question and answer.");
            return;
        }
        setMessages("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dataValidation();
        if (!messages) {
            setShowSecurityForm(true);
        }
    };

    return (
        <div>
            <h2>Create an Account</h2>
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
                                    placeholder="Enter Security Question"
                                    value={securityQuestion}
                                    onChange={(e) => setSecurityQuestion(e.target.value)}
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
