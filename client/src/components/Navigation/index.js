import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';

function Navigation() {
  return (
    <Navbar bg="info" variant="light">
      <Container>
        <Navbar.Brand>Samby's Shows</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {process.env.NODE_ENV !== "production" && 
            <Nav.Link href="/addshow">Add Show</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  )
};

export default Navigation;