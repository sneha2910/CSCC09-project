import Container from 'react-bootstrap/Container';
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ULTOS = () => {
  return (
    <Container>
      <Card border="light">
        <Row className="justify-content-md-center">
           <Col md={{ span: 6}}>
          <Card.Title>The UI Lab Terms of Service</Card.Title>
            <Card.Text>When creating an account, we are going to collect your email address and send you email about your account and project information.</Card.Text>
           </Col>
        </Row>
        </Card>
    </Container>
  )
}

export default ULTOS;