import { Link } from "react-router-dom";
import Stack from "react-bootstrap/esm/Stack";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ULResetPassword } from "../components/ULResetPassword";

export default function ULForgetPassword() {
   
  return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={{ span: 6}}>
                    <Stack gap={3}>
                        <text> Enter your email to reset password</text>
                        <ULResetPassword />
                        <Link to="/Login">Cancel</Link>
                    </Stack>
                </Col>
            </Row>
        </Container>
  );
}