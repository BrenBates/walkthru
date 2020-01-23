import React, { useState, useEffect } from "react";
import axios from 'axios';
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
  Button
} from 'reactstrap';
import MapContainer from "../components/MapContainer"

function Landing(props) {
  const { setAuthTokens } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mapInfo, setMapInfo] = useState([]);

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

  function loadMap() {
    console.log('what up')

    axios.get("/api/houses/", {

  })
  .then(result => {
    console.log(result)
    setMapInfo(result.data)

  });
  }

  useEffect(() => {
    // Update the document title using the browser API
    loadMap();
  },[]);

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
          <Col xs="12">
            <p>Row 1</p>
          </Col>
        </Row>

        <Row>
          <Col xs="6">
            <MapContainer mapInfo = {mapInfo}/>     
          </Col>
          <Col xs="6">
            <p>Column 2</p>    
          </Col>
        </Row>

    </Container>


    
    </div>
  );
}

export default Landing;



