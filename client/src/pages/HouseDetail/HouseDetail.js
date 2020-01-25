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

    const [houseURL,setHouseURL] = useState('')
    const [houseInfoReceived,setHouseInfoReceived] = useState(false)
    const [houseInfo,setHouseInfo] = useState('')

  useEffect(() => {
    // When component mounts, load the house id from the props.params into the state
        setHouseURL('/api/houses/'+ props.match.params.id)
  },[]);

  useEffect(() => {
    populateHouseInfo()
  }, [houseURL])
  
  const populateHouseInfo = () =>
  {
    console.log('this is inside the populate house info function')
    console.log(houseURL)
      axios.get(houseURL).then(() => {
        console.log('retrieved house info')
      }) 
  }
  
//   if(houseInfoReceived) {
//       return (
//           <div>res.data.street</div>
//       )
//   }

  return (

    <div>
        <p>{houseURL}</p>
    </div>


  )

}


export default HouseDetail;
