import React, { useState, Component } from 'react';
import { Link } from "react-router-dom";
import "../Navbar/navbar.css";
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
      <Navbar scrolling dark expand="md" fixed='top'>
        <NavbarBrand className="brand" href="/">walkthru</NavbarBrand>
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
          <NavbarText />
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarPage;


// import React, { Component } from "react"
// import styled from "styled-components"

// const NavbarEl = styled.nav`
//   margin: auto;
// `

// const NavbarList = styled.ul`
//   display: flex;
//   justify-content: center;
//   list-style: none;
//   margin: 0;
// `

// class Navbar extends Component {
//   render() {
//     const { children, onMouseLeave } = this.props
//     return (
//       <NavbarEl onMouseLeave={onMouseLeave}>
//         <NavbarList>{children}</NavbarList>
//       </NavbarEl>
//     )
//   }
// }

// export default Navbar
