import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Container for Terms of Services for creating an account
const ULTOS = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={{ span: 6 }}>
          <text>
            When creating an account, we are going to collect your email address
            and send you email about your account and project information.
          </text>
        </Col>
      </Row>
    </Container>
  );
};

export default ULTOS;
