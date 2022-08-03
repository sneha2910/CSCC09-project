import { Link, useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ULSignUpForm } from "../components/ULSignUpForm";
import { ULGoogleButton } from "../components/ULGoogleButton";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

//Sign up page
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
    <Container>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <Row className="justify-content-md-center">
        <Col md={{ span: 6 }}>
          <Stack gap={3}>
            Create an account to use The UI Lab
            <ULGoogleButton />
            or
            <ULSignUpForm createUser={createUser} />
            <Link to="/Login">Log in</Link>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
