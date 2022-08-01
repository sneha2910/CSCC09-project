import { Link } from "react-router-dom";
import Stack from "react-bootstrap/esm/Stack";
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ULLoginForm } from "../components/ULLoginForm";
import { ULGoogleButton } from "../components/ULGoogleButton";


export default function ULLogin() {
    const createUser = (username, password) => {
};

  return (
        <Container className="d-block align-items-center bg-white bg-gradient">
            <Row className="justify-content-center pt-5 h1 font-weight-bold">
                The UI Lab
            </Row>
            
            <Row className="justify-content-md-center pt-5">
                <Col>
                    <Image src="https://i.pinimg.com/originals/cb/7e/f2/cb7ef26e157572c44cc84f88e92e5149.gif">
                    </Image> 
                </Col>
                <Col className="align-items-center border flex-column">
                    <Row className="justify-content-md-center pt-2 h4 font-weight-normal">
                        Log in to The UI Lab
                    </Row>
                    <Stack gap={3}>
                        <ULGoogleButton className="pt-4"/>
                        or
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