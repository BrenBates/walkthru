import React, { useState, useEffect } from "react";
import {  Link } from "react-router-dom";
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
  const [currentHouse, setCurrentHouse] = useState({});
  const [houseSelected, setHouseSelected] = useState(false);

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

  const handleClick = houseID => {
    
    //filter the mapInfo array to isolate the house that was clicked
    let house = mapInfo.filter(item => {
      if(item._id === houseID) {
        return true;
      }
    })

    console.log('this is the house')
    console.log(house)
    //set the selected house into the state
    setCurrentHouse(house[0]);
    //toggle the flag that the house is selected.
    setHouseSelected(true);

  }


  useEffect(() => {
    // Update the document title using the browser API
    loadMap();
  },[]);

  const renderHouse = () => {
  if (houseSelected) { 
    return ( 
      <div>
        <Link to={"/api/houses/"+currentHouse._id}>Go to House</Link>
        <p>{currentHouse.headline}</p>
        <p>{currentHouse.street}</p>
        <p>{currentHouse.city}</p>
        <p>{currentHouse.state}</p>
        <img src={currentHouse.houseImageURL} alt="house image"></img>
      </div>
      ) 
  } else {
    return <p></p>
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
          <Col xs="12">
            <p>Row 1</p>
          </Col>
        </Row>

        <Row>
          <Col xs="6">
            <MapContainer mapInfo = {mapInfo} clickHouse={handleClick}/>     
          </Col>
          <Col xs="6">
            
            <p>Selected House:</p>
            {renderHouse()}
           
          </Col>
        </Row>

    </Container>


    
    </div>
  );
}

export default Landing;



