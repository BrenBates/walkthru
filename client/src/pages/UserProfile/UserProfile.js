import React, { useState, useEffect} from "react";
import axios from 'axios';
import * as Yup from "yup";
import { Formik, Form, useField } from "formik";
import '../UserProfile/userprofile.css'
import { AuthContext } from "../../context/auth";
import { useAuth } from "../../context/auth";
import { Redirect } from "react-router-dom";
import House from "../../components/House/House";
import {
  Row, Col
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
    console.log('this is the current user')
    console.log(user)

    let queryURL = "/api/users/" + user;
    axios.get(queryURL).then(res => {
      setUserHouses(res.data.SavedHouses)
    })
  }

  const renderSavedHouses = () => {

    if (userHousesReceived) {
    return(
      userHouses.map(house => 
        <House
          houseID = {house.houseID}
          headline = {house.headline}
          houseImage = {house.houseImageURL}
          street = {house.street}
          city = {house.city}
          st = {house.st}
          zip = {house.zip}
        />
      )
    )
  }

  }

  return (

    <AuthContext.Consumer>
      {authValue => (

        <div>

          <Row>
            <Col xs="4">

              <h4>{`welcome ${authValue.authTokens.username}`}</h4>
            <img className="userProfileImg" alt="profile pic" src={authValue.authTokens.userImage}></img>


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
                    console.log('result')
                    //Change the auth tokens to be the new result data.
                  setAuthTokens(result.data)
                  console.log(authValue)
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

            <Col xs="4">
               {renderSavedHouses()}
            </Col>
          </Row>
          
        </div>

      )}
    </AuthContext.Consumer>


  )

}


export default UserProfile;