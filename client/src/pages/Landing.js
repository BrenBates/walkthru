
import React, { useState } from "react";
import { useAuth } from "../context/auth";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from 'reactstrap';
import MapContainer from "../components/MapContainer"


function Landing(props) {
  const { setAuthTokens } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  function logOut() {
    setAuthTokens();
  }

  function toggle() {
    if(isOpen === false) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }




  return (
    <div>

    <Navbar color="dark" light expand="md">
                    <NavbarBrand className="text-info" href="/">Walkthru</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className="text-info" href="/">User Profile</NavLink>
                            </NavItem>
                            <NavItem>
                              <Button color="info" onClick={logOut}>Log out</Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
    </Navbar>

    <Container>
        <Row>
            <p>Row 1</p>
        </Row>

        <Row>
            <MapContainer/>
           
        </Row>
    </Container>


    
    </div>
  );
}

export default Landing;



