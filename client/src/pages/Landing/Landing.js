import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import '../Landing/landing.css'
import * as Yup from "yup";
import { Formik, Form, useField } from "formik";
import { Error } from '../../components/AuthForm';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import MapContainer from "../../components/MapContainer";
import Geocode from "react-geocode";
// import { response } from "express";
// import API from "../../utils/API";

Geocode.setApiKey('AIzaSyCSybu-E2Hs97g9Wwo8XmqTVtA-4y9h9co');
// RJ's GOOGLE API KEY
Geocode.setLanguage("en");
Geocode.enableDebug();


function Landing(props) {

  const [mapInfo, setMapInfo] = useState([]);
  const [currentHouse, setCurrentHouse] = useState({});
  const [houseSelected, setHouseSelected] = useState(false);
  const [isError,setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  //Text input for Formik form.
  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  function loadMap() {
    axios.get("/api/houses/", {
    })
      .then(result => {
        setMapInfo(result.data)
      });
  }

  //handle click function for when a user clicks on a marker on the Google Map API.
  const handleClick = houseID => {

    //filter the mapInfo array to isolate the house that was clicked
    let house = mapInfo.filter(item => {
      if (item._id === houseID) {
        return true;
      } else {
        return false;
      }
    })

    //set the selected house into the state
    setCurrentHouse(house[0]);
    //toggle the flag that the house is selected.
    setHouseSelected(true);
  }

  //Use Effect hook to load the google map upon component mount.
  useEffect(() => {
    // Update the document title using the browser API
    loadMap();
  }, []);

  //Conditional rendering for when the user clicks on a marker on the Google Maps API.
  const renderHouse = () => {
    if (houseSelected) {
      return (
        <div>
          <Link to={"/api/houses/" + currentHouse._id}>Go to House</Link>
          <p>{currentHouse.headline}</p>
          <p>{currentHouse.street}</p>
          <p>{currentHouse.city}</p>
          <p>{currentHouse.state}</p>
          <img className="landingImg" src={currentHouse.houseImageURL} alt="house"></img>
        </div>
      )
    } else {
      return <p></p>
    }
  }

  return (
    <div>
      <Container>
        <Row>
          <Col xs="12">
            {/* In this first row adding a search form for users to determine if a property exists yet or not. */}

            <Formik
              initialValues={{
                street: "",
                city: "",
                st: "",
                zip: ""
              }}
              validationSchema={Yup.object({
                street: Yup.string()
                  .max(25, "Must be 25 characters or less")
                  .required("Required"),
                city: Yup.string()
                  .max(20, "Must be 20 characters or less")
                  .required("Required"),
                st: Yup.string()
                  .max(15, "Must be 15 characters or less"),
                zip: Yup.string()
                  .min(5, "Zip Must be 5 digits.")
                  .max(5, "Zip Must be 5 digits.")
                  .required('Required'),
              })}
              onSubmit={(values, { setSubmitting }) => {
                // setTimeout(() => {
                //   alert(JSON.stringify(values, null, 2));
                //   setSubmitting(false);  
                // }, 400);
                let {street, city, st, zip} = values;
                console.log(values);
                Geocode.fromAddress(street + ', ' + city + ', ' + st)
                .then(
                  response => {
                    let lat = response.results[0].geometry.location.lat;
                    let long = response.results[0].geometry.location.lat;
                    axios.post("/api/houses", {
                      street,
                      city,
                      st,
                      zip,
                      lat,
                      long
                    })
                    .then(result => {
                      if(result.data.error) {
                        setErrorText(result.data.error);
                        setIsError(true);
                      }
                    }).catch(err => {
                      console.log(err);
                    });
                  }
                )
                console.log('submit button hit')
              }}
            >
              {/* splitting the form up into sub columns so it doesn't take up too much vertical space. */}
              <Form className="landSrchHouseFrm">
                <Row>
                  {/* <Col xs="4">
                <div className="landSrchHouseDiv"> 
                <p>Search for a house:</p>
                <button className="landSrchHouseBtn" type="submit">Submit</button>
                </div>
              </Col> */}
                  <Col xs="5">
                    <MyTextInput
                      className="landSrchInput"
                      // label="Street"
                      name="street"
                      type="text"
                      placeholder="123 N 456 W"
                    />
                  </Col>
                  <Col xs="4">
                    <MyTextInput
                      className="landSrchInput"
                      // label="City"
                      name="city"
                      type="text"
                      placeholder="City"
                    />
                  </Col>
                  <Col xs="1">
                    <MyTextInput
                      className="landSrchInput"
                      // label="State"
                      name="st"
                      type="text"
                      placeholder="State"
                    />
                  </Col>
                  <Col xs="2">
                    <MyTextInput
                      className="landSrchInput"
                      // label="State"
                      name="zip"
                      type="number"
                      placeholder="Zip"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs="6" md="3">
                    <p>Search for a house:</p>
                  </Col>
                  <Col xs="2">
                    <button className="landSrchHouseBtn" type="submit">Submit</button>
                  </Col>
                </Row>
              </Form>
            </Formik>
            { isError &&<Error>{errorText}</Error>}
          </Col>
        </Row>

        <Row>
          <Col xs="6">
            <MapContainer mapInfo={mapInfo} clickHouse={handleClick} />
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



