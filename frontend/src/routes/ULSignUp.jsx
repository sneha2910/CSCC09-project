import { Link } from "react-router-dom";
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ULSignUpForm } from "../components/ULSignUpForm";
import { ULGoogleButton } from "../components/ULGoogleButton";


export default function ULSignUp() {
  return (
    <Container>
        <Row className="justify-content-md-center">
           <Col md={{ span: 6}}>
               <Stack gap={3}>
          Create an account to use The UI Lab
          <ULGoogleButton />
          or
          <ULSignUpForm />
          <Link to="/Login">Log in</Link> 
        </Stack>
           </Col>
        </Row>
    </Container>
  );
}