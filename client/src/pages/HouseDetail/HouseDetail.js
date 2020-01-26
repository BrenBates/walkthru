import React, { useState, useEffect, useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import axios from 'axios';
import * as Yup from "yup";
import { Formik, Form, useField } from "formik";
import '../HouseDetail/housedetail.css'
// import { useAuth } from "../../context/auth";
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { AuthContext } from "../../context/auth";

function HouseDetail(props) {

  //Text input for Formik form.
  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <Row>
          <Col>
            <Container>
              <Card>
                <Row>
                  <Col>
                    <CardImg top width="100%" src="https://s3-media0.fl.yelpcdn.com/bphoto/MlJLm2ycI7sghPmJbhRZjw/l.jpg" alt="Card image cap" />
                  </Col>
                  <Col>
                    <CardBody>
                      <CardTitle>{houseHeadline}</CardTitle>
                      <CardSubtitle>{(houseForSale ? "This property is for sale" : "This property is for rent")}</CardSubtitle>
                      <CardText>{houseStreet}, {houseCity}, {houseState}, {houseZip}</CardText>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </Container>
          </Col>
        </Row>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  const [houseURL, setHouseURL] = useState('')
  const [houseInfoReceived, setHouseInfoReceived] = useState(false)
  const [houseID, setHouseID] = useState('')
  const [houseImageURL, setHouseImageURL] = useState('')
  const [houseHeadline, setHouseHeadline] = useState('')
  const [houseStreet, setHouseStreet] = useState('')
  const [houseCity, setHouseCity] = useState('')
  const [houseState, setHouseState] = useState('')
  const [houseZip, setHouseZip] = useState('')
  const [houseForRent, setHouseForRent] = useState(false)
  const [houseForSale, setHouseForSale] = useState(true)

  useEffect(() => {
    // When component mounts, load the house id from the props.params into the state
    setHouseURL('/api/houses/' + props.match.params.id)
  }, []);

  useEffect(() => {
    populateHouseInfo()

  }, [houseURL])

  const populateHouseInfo = () => {

    axios.get(houseURL).then((res) => {

      const data = res.data;
      console.log(data)
      setHouseID(data._id);
      setHouseHeadline(data.headline);
      setHouseImageURL(data.houseImageURL);
      setHouseStreet(data.street);
      setHouseCity(data.city);
      setHouseState(data.state);
      setHouseZip(data.zip);
      setHouseForRent(data.forRent);
      setHouseForSale(data.forSale);
      setHouseInfoReceived(true);
    })
  }

  //create a button with an id of the userid from the context.

  // const AuthButton = () => (

  //   return (

  //   )

  //   )

  const renderPage = () => {
    if (houseInfoReceived) {
      return (
        <div>
          <AuthContext.Consumer>
            {authValue => (

              <Formik
                initialValues={{
                  comment: ""
                }}
                validationSchema={Yup.object({
                  comment: Yup.string()
                    .min(1, "Must have at least one character")
                    .required("Required")
                })}
                onSubmit={(values, { setSubmitting }) => {
                  // setTimeout(() => {
                  //   alert(JSON.stringify(values, null, 2));
                  //   setSubmitting(false);  
                  // }, 400);

                  console.log("user: " + authValue.authTokens.username);

                  let nameURL = "/api/users/comments";
                  console.log("nameURL: " + nameURL);

                  axios.get(nameURL).then(() => {
                    console.log("/api/users/comments");
                  })
                  .catch(err => console.log(err));

                  // let { comment } = values

                  // axios.post("/api/users/login", {
                  //   comment,
                  //   houseID,
                  // })
                  //   .then(result => {
                  //     // if (result.status === 200) {

                  //     //   if (result.data.error) {
                  //     //     setErrorText(result.data.error)
                  //     //     setIsError(true)
                  //     //   } else {
                  //     //     //Set the auth token along with the user data into the context
                  //     //     setAuthTokens(result.data)
                  //     //     setLoggedIn(true);
                  //     //   }
                  //     // } else {
                  //     //   setIsError(true);
                  //     // }
                  //   })
                  // .catch(e => {
                  //   setIsError(true);
                  // });

                }
                }
              >
                <Form>
                  <MyTextInput
                    label="New Comment"
                    name="comment"
                    type="text"
                    placeholder="Enter new comment..."
                  />

                  <button type="submit">Add Comment</button>
                </Form>
              </Formik>
            )}
          </AuthContext.Consumer>
        </div>
      )
    }
  }

  return (
    <div>{renderPage()}</div>
  )
}

export default HouseDetail;
