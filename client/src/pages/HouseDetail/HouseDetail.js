import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import '../HouseDetail/housedetail.css'
import { useAuth } from "../../context/auth";
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



function HouseDetail(props) {

    const [houseID,setHouseID] = useState('hello')

  useEffect(() => {
    // When component mounts, load the house id from the props.params into the state
    setHouseID(props.match.params.id)
    populateHouseInfo();

  },[]);
  

  const populateHouseInfo = () =>
  {
    let queryURL = "//api/houses" + houseID
      axios.get(queryURL).then(() => {
        console.log('retrieved house info')
      }) 
  }
  

  return (

    <div>
        <p>{houseID}</p>
    </div>

  )

}


export default HouseDetail;