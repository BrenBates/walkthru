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

    const [houseID, setHouseID] = useState('hello');
    const [houseInfoReceived, setHouseInfoReceived] = useState(false);
    const [houseInfo, setHouseInfoR] = useState('');

  useEffect(() => {
    async function popHouseID() {
      // When component mounts, load the house id from the props.params into the state
     await setHouseID(props.match.params.id);
    }
    popHouseID().then(populateHouseInfo());
  },[]);

  const populateHouseInfo = () =>
  {
    console.log(houseID);
    let queryURL = "/api/houses/" + houseID;
    console.log(queryURL);
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