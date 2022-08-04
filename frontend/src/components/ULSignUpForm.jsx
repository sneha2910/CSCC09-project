import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react'
import { useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import userService from '../services/userService.js';

export function  ULSignUpForm(props) {
  const { createUser } = props;
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    userService.signUp(username, email, password).catch(error => {
    })
    .then(() => {
        //navigate to hompage once succesful sign up
        navigate("/");
  });
    
  //Reset form after sign up
    e.target.reset();
  };

  //Form for user sign up
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Username" ref={usernameRef}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="By creating an account, I agree to The UI Lab's TOS" required/>
        <Link target="_blank"to="/TOSPage">TOS</Link>
      </Form.Group>

      <Button variant="primary" type="submit">
        Creat Account
      </Button>
    </Form>
  );
}
