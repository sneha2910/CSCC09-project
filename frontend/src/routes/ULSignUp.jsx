import { Link, useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ULSignUpForm } from "../components/ULSignUpForm";
import { ULGoogleButton } from "../components/ULGoogleButton";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function ULSignUp() {
  // Save to local storage every time the messages are changed

  const { signUp } = useContext(UserContext);
  const navigate = useNavigate();

  const createUser = (username, email, password) => {
    signUp(username, email, password)
      .then((retn) => {
        console.log("create user success:", retn);
        navigate("/login");
      })
      .catch((error) => {
        console.log("create user failed:", error);
      });
  };

  return (
    <Container className="justify-content-md-center" md={{ span: 5 }}>
      <Card border="light">
      <Row className="justify-content-md-center">
        <Col md={{ span: 4 }}>
          <Stack gap={3}>
            <Card.Title>Create an account to use The UI Lab</Card.Title>
            <Card.Body>
              <ULGoogleButton />
            <Card.Text>or</Card.Text>
            <ULSignUpForm createUser={createUser} />
            <Link to="/Login">Log in</Link>
            </Card.Body>
          </Stack>
        </Col>
      </Row>
      </Card>
    </Container>
  );
}
