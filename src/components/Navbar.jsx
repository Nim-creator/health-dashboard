import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CustomNavbar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow">
      <Container fluid="xxl">
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Health Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/history">History</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar
