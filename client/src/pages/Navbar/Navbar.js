import React, { useState } from 'react';
import styled from 'styled-components'
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
import { AuthContext } from "../../context/auth";

const NavbarPage = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <AuthContext.Consumer>
        {authValue => (
          <Navbar scrolling dark expand="md" fixed='top'>
            <NavbarBrand className="brand" href="/">walkthru</NavbarBrand>
            {/* {authValue.authTokens ? <h1>Authorized</h1>:<p></p>} */}
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                {/* <NavItem>
             <NavLink tag={Link} to="/" className="text-info">Home</NavLink>
              </NavItem> */}
                {authValue.authTokens ?
                  <>
                    <NavItem>
                      <NavLink tag={Link} to={`/users/${authValue.authTokens.username}`} className="text-info">Your Profile</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} to="/Landing" className="text-info">Landing</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} onClick={props.logOut} to="/User" className="text-info">Log Out</NavLink>
                    </NavItem>
                  </>
                  : ''}
              </Nav>
              <NavbarText />
            </Collapse>
          </Navbar>
        )}
      </AuthContext.Consumer>

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
