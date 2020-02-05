import React, { useState, useEffect} from "react";
import axios from 'axios';
import * as Yup from "yup";
import { Formik, Form, useField } from "formik";
import '../UserProfile/userprofile.css'
import { AuthContext } from "../../context/auth";
import { useAuth } from "../../context/auth";

import SavedHouse from "../../components/SavedHouse/SavedHouse";
import Wrapper from "../../components/Wrapper/index";
import {
  Row, Col, Container
} from 'reactstrap';




function UserProfile(props) {

  //Hooks
  const [userHouses, setUserHouses] = useState([]);
  const [userHousesReceived, setUserHousesReceived] = useState(false);


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
  const { setAuthTokens } = useAuth();

  useEffect(() => {
    pullSavedHouses(props.match.params.username)
  },[])

  useEffect(() => {
    setUserHousesReceived(true)
  },[userHouses])

  const pullSavedHouses = (user) => {
  
    let queryURL = "/api/users/" + user;
    axios.get(queryURL).then(res => {
      setUserHouses(res.data.SavedHouses)
    })
  }

  const deleteSavedHouse = (id) => {
    
    let queryURL = "/api/houses/savehouse/" + id
    console.log('this is the query url')
    console.log(queryURL)
    axios.delete(queryURL).then(res => {
      console.log('this is inside the delete houses')
      console.log(props.match.params.username)
      pullSavedHouses(props.match.params.username)
    })
  }

  const renderSavedHouses = () => {

    if (userHousesReceived) {
    return(
      userHouses.map(house => 
        <SavedHouse
          savedHouseID = {house._id}
          houseID = {house.houseID}
          headline = {house.headline}
          houseImage = {house.houseImageURL}
          street = {house.street}
          city = {house.city}
          st = {house.st}
          zip = {house.zip}
          deleteSavedHouse = {deleteSavedHouse}
        />
      )
    )
  }

  }

  return (

    <AuthContext.Consumer>
      {authValue => (
        <Container className="userContainer">
          <Row>
            <Col sm="12" md="6">
              
              <Row>
                <h4>{`welcome ${authValue.authTokens.username}`}</h4>
              </Row>

              <Row>
              <img className="userProfileImg" alt="profile pic" src={authValue.authTokens.userImage}></img>
              </Row>
              
                
              
              


            <Formik
              initialValues={{
                picURL: "",
              }}
              validationSchema={Yup.object({
                picURL: Yup.string()
                  .url("Must enter a URL")
                  .required("Required")
              })}
              onSubmit={(values, { setSubmitting }) => {
                // setTimeout(() => {
                //   alert(JSON.stringify(values, null, 2));
                //   setSubmitting(false);  
                // }, 400);

                let imgURL = values.picURL

                axios.put("/api/users/", {
                  user: authValue.authTokens.username,
                  imgURL: imgURL
                })
                  .then(result => {
                    
                    //Change the auth tokens to be the new result data.
                  setAuthTokens(result.data)
                  
                  })

              }}
            >
              <Form>
                <MyTextInput
                  // onChangeText="{handleChange(picURL)}"
                  label="Change your profile picture:"
                  name="picURL"
                  type="text"
                  placeholder="http://yourimagehere.com"
                />


                <button type="submit">Submit</button>
                
              </Form>
            </Formik>
      
            </Col>

            <Col sm="12" md="6">
                <Row>
                 <h4>Your Saved Houses</h4>
                </Row>
                <Wrapper>                
                 {renderSavedHouses()}
               </Wrapper>
            </Col>
          </Row>
          
        </Container>


      )}
    </AuthContext.Consumer>


  )

}


export default UserProfile;