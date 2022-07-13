import { Link } from "react-router-dom";
import Stack from "react-bootstrap/esm/Stack";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ULLoginForm } from "../components/ULLoginForm";
import { ULGoogleButton } from "../components/ULGoogleButton";


export default function ULLogin() {
    const createUser = (username, password) => {
    const createUser = {
      //userId: `user-${users.length}`,
      username,
      password,
    };
};

  return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={{ span: 6}}>
                    <Stack gap={3}>
                        Log in to use The UI Lab
                        <ULGoogleButton />
                        <text>or</text>
                        <ULLoginForm 
                    createMessage={createUser}
                    />
                    <Link to="/forgetPassword">Forget password?</Link> 
                    <Link to="/SignUp">Sign up</Link>
                    </Stack>
                </Col>
            </Row>
        </Container>
  );
}