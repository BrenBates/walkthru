import React, { useState } from 'react';
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
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Landing">Landing</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Login">Sign Out</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>walkthru-ers are saying...</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarPage;