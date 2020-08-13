import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Finance Tools
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/asset-allocation">
            Asset Allocation
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
