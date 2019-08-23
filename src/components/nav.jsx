import React from 'react';
import { Nav, Navbar, NavDropdown} from 'react-bootstrap';
import Octicon, { Person } from '@primer/octicons-react';
import { Link } from 'react-router-dom';

function navComponent() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about/" className="nav-link">About</Link>
          <span className="filler" />
          <NavDropdown
            title={
              <Octicon icon={Person} />
             }
            id="basic-nav-dropdown"
            className="ml-auto"
            // eslint-disable-next-line react/jsx-closing-bracket-location
            >
            <NavDropdown.Item to="/login">Login</NavDropdown.Item>
            <NavDropdown.Item to="/register">Register</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default navComponent;
