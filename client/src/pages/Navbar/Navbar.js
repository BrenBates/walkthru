import React, { useState } from 'react';
import {  Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const NavbarPage = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">walkthru</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/" className="text-info">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/Landing" className="text-info">Landing</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/User" className="text-info">Your Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} onClick={props.logOut} to="/User" className="text-info">Log Out</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>walkthru-ers are saying...</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarPage;