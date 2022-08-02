import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export function ULResetPassword(props) {

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Reset Password
      </Button>
    </Form>
  )
}