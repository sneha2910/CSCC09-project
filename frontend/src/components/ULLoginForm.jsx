import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import PropTypes from 'prop-types';

export function ULLoginForm({ setToken }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { signIn } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    signIn(emailRef.current.value, passwordRef.current.value)
      .then((res) => {
        console.log("Logged in!" + res);
        setToken(res);
        /* Redirect to the homepage */
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });

    e.target.reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Log in
      </Button>
    </Form>
  );

}
ULLoginForm.propTypes = {
  setToken: PropTypes.func.isRequired
}
