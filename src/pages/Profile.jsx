import { Card, Form, Button } from 'react-bootstrap'

const Profile = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>User Profile</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" placeholder="Enter age" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select>
              <option>Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Profile

