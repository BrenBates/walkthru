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
  Col,
  ListGroup
} from 'reactstrap';
import Placeholder from "../../img/placeholder.png";
import MapContainer from "../../components/MapContainer";
import Geocode from "react-geocode";
import { AuthContext } from "../../context/auth";
import HouseListContainer from "../../components/HouseListContainer";

Geocode.setApiKey(process.env.REACT_APP_GEOCODEAPI);
Geocode.setLanguage("en");
Geocode.enableDebug();

function Landing(props) {

  const [mapInfo, setMapInfo] = useState([]);
  const [currentHouse, setCurrentHouse] = useState({});
  const [houseSelected, setHouseSelected] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [housesExist, setHousesExist] = useState(false);
  const [allHouses, setAllHouses] = useState({});


  //Text input for Formik form.
  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        {/* <label htmlFor={props.id || props.name}>{label}</label> */}
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
        if (result.data) {
          setHousesExist(true);
        }
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

  //Function to save the current house into the SavedHouses database
  const saveHouse = (username) => {

    console.log(username)
    let queryURL = "/api/houses/savehouse/" + username

    let houseID = currentHouse._id;
    let { headline, houseImageURL, street, city, st, zip, lat, long } = currentHouse;

    let payload = {
      houseID,
      headline,
      houseImageURL,
      street,
      city,
      st,
      zip,
      lat,
      long
    }
    axios.post(queryURL, payload)
      .then(result => {
        console.log("result:  ", result)
      })
  }

  //Use Effect hook to load the google map upon component mount.
  useEffect(() => {
    // Update the document title using the browser API
    loadMap();
  }, []);

  //Conditional rendering for when the user clicks on a marker on the Google Maps API.
  const renderSelectedHouse = () => {
    if (houseSelected && currentHouse.houseImageURL) {
      return (
        <Col>
          <Row>
            <h5>{currentHouse.headline}</h5>
          </Row>
          <Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img className="selected-house-image" src={currentHouse.houseImageURL} alt="Selected house" />
          </Row>
        </Col>
      )
    } else if (houseSelected && !currentHouse.houseImageURL) {
      return (
        <Col>
          <Row>
            <h5>{currentHouse.headline}</h5>
          </Row>
          <Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img className="selected-house-image" src={Placeholder} alt="Selected house" />
          </Row>
        </Col>
      )
    } else
      return <></>
  }

  const renderHouseSearch = () => {
    return (
      <Form className="search-house-form">
        <Row>
          <Col xs={12} md={12} lg={12} xl={12} className="text-center">
            <MyTextInput
              className="input-headline-field"
              name="headline"
              type="text"
              placeholder="Enter Headline here...."
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4} lg={4} xl={4} className="text-center">
            <MyTextInput
              className="input-street-field"
              // label="Street"
              name="street"
              type="text"
              placeholder=" 123 N 456 W"
            />
          </Col>
          <Col xs={12} md={5} lg={3} xl={3} className="text-center">
            <MyTextInput
              className="input-city-field"
              // label="City"
              name="city"
              type="text"
              placeholder=" City"
            />
          </Col>
          <Col xs={2} md={1} lg={1} xl={1} className="text-center">
            <MyTextInput
              className="input-state-field"
              name="st"
              type="text"
              placeholder=" State"
            />
          </Col>
          <Col xs={4} md={2} lg={2} xl={2} className="text-center">
            <MyTextInput
              className="input-zip-field"
              name="zip"
              type="text"
              placeholder=" Zip"
            />
          </Col>
          <Col xs={6} md={12} lg={2} xl={2} className="text-center">
            <button className="button-search" type="submit">Add Address</button>
          </Col>
        </Row>
      </Form>
    )
  }

  const renderHouseList = () => {
    if (mapInfo) {
      return (
        mapInfo.map(item =>
          <HouseListContainer
            key={item._id}
            houseID={item._id}
            headline={item.headline}
            street={item.street}
            city={item.city}
            st={item.st}
            zip={item.zip}
          />
        )
      )
    }
  }
  return (
    <div>
      <AuthContext.Consumer>
        {authValue => (
          <Container>
            <Row className="map-selected-house-row">
              <Col md={6} className="map-container">
                <MapContainer mapInfo={mapInfo} clickHouse={handleClick} />
              </Col>
              <Col md={6} className="selected-house-container">
                {renderSelectedHouse()}
                {/* Conditionally render the save house button if the house is selected.  This couldn't be in the render house function
          because it requires the auth context  */}
                {houseSelected ?
                  <Row style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1em" }}>
                    <p>{currentHouse.street} {currentHouse.city}, {currentHouse.st} {currentHouse.zip}</p>
                    <button className="save-visit-house-button" onClick={() => saveHouse(authValue.authTokens.username)}>
                      Save
                    </button>
                    <Link to={"/api/houses/" + currentHouse._id}>
                      <button className="save-visit-house-button" >Visit</button>
                    </Link>
                  </Row> : <></>}
              </Col>
            </Row>
            <Row>
              <Col style={{ padding: 0 }}>
                {/* In this first row adding a search form for users to determine if a property exists yet or not. */}
                <Formik
                  initialValues={{
                    headline: "",
                    street: "",
                    city: "",
                    st: "",
                    zip: ""
                  }}
                  validationSchema={Yup.object({
                    headline: Yup.string()
                      .max(75, "Headline must be 30 characters or less")
                      .required(""),
                    street: Yup.string()
                      .max(25, "Must be 25 characters or less")
                      .required(""),
                    city: Yup.string()
                      .max(20, "Must be 20 characters or less")
                      .required(""),
                    st: Yup.string()
                      .max(15, "Must be 15 characters or less"),
                    zip: Yup.string()
                      .min(5, "Zip Must be 5 digits.")
                      .max(5, "Zip Must be 5 digits.")
                      .required(''),
                  })}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    let { headline, street, city, st, zip } = values;
                    console.log(values);
                    Geocode.fromAddress(street + ', ' + city + ', ' + st)
                      .then(
                        response => {
                          let lat = response.results[0].geometry.location.lat;
                          let long = response.results[0].geometry.location.lng;
                          axios.post("/api/houses", {
                            headline,
                            street,
                            city,
                            st,
                            zip,
                            lat,
                            long
                          })
                            .then(result => {
                              loadMap();
                              if (result.data.error) {
                                setErrorText(result.data.error);
                                setIsError(true);
                              }
                            }).catch(err => {
                              console.log(err);
                            });
                        }
                      )
                    resetForm();
                    console.log('submit button hit')
                  }}
                >
                  {renderHouseSearch()}
                </Formik>
                {isError && <Error>{errorText}</Error>}
              </Col>
            </Row>
          </Container>

        )}
      </AuthContext.Consumer>
      <Container className="list-of-houses" >
        <ListGroup>
          {renderHouseList()}
        </ListGroup>
      </Container>
    </div>
  );
}

export default Landing;



