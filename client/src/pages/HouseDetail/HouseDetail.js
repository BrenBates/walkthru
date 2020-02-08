import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as Yup from "yup";
import { Formik, Form, useField } from "formik";
import '../HouseDetail/housedetail.css'
// import { useAuth } from "../../context/auth";
import {
  Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Jumbotron, Input, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import Comment from "../../Comment/Comment"
import { AuthContext } from "../../context/auth";

function HouseDetail(props) {

  //Text input for Formik form.
  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText htmlFor={props.id || props.name}>{label}</InputGroupText>
        </InputGroupAddon>
        <Input  {...field} {...props}/>
          {/* <Label htmlFor={props.id || props.name}>{label}</Label> */}
          {/* <input className="text-input" {...field} {...props} /> */}
        </InputGroup>
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
  const [houseForSale, setHouseForSale] = useState(true)
  const [comments, setComments] = useState([])
  const [commentsReceived, setCommentsReceived] = useState(false)
  const [newCommentSubmitted, setNewCommentSubmitted] = useState(0)

  useEffect(() => {
    // When component mounts, load the house id from the props.params into the state
    setHouseURL('/api/houses/' + props.match.params.id)
    // Also, when the component mounts, send an axios get call with the house ID to get the comments.
    loadComments(props.match.params.id)

  }, [props.match.params.id]);

  // Get all the data related to the current house to the user
  useEffect(() => {

    const populateHouseInfo = () => {

      axios.get(houseURL).then((res) => {

        const data = res.data;
        setHouseID(data._id);
        setHouseHeadline(data.headline);
        setHouseImageURL(data.houseImageURL);
        setHouseStreet(data.street);
        setHouseCity(data.city);
        setHouseState(data.st);
        setHouseZip(data.zip);
        setHouseForSale(data.forSale);
        setHouseInfoReceived(true);
      })
    }

    populateHouseInfo()
  }, [houseURL]);

  // Get the latest comments loaded to the page
  useEffect(() => {
    loadComments(props.match.params.id)
  }, [newCommentSubmitted]);

  useEffect(() => {
    loadComments(props.match.params.id)
  }, [newCommentSubmitted, props.match.params.id])

  const loadComments = (id) => {
    let queryURL = "/api/comments/byhouse/" + id;
    axios.get(queryURL).then(res => {
      setComments(res.data)
      setCommentsReceived(true)
    })
  }

  const populateHouseInfo = () => {

    axios.get(houseURL).then((res) => {
      const data = res.data;
      setHouseID(data._id);
      setHouseHeadline(data.headline);
      setHouseImageURL(data.houseImageURL);
      setHouseStreet(data.street);
      setHouseCity(data.city);
      setHouseState(data.state);
      setHouseZip(data.zip);
      setHouseForSale(data.forSale);
      setHouseInfoReceived(true);
    })
  }

  const renderHouseInfo = () => {
    if (houseInfoReceived) {
      return (
        <div>
          <Jumbotron className="jumbo-container">
            <Row>
              <Col>
                <Container>
                  <Card>
                    <Row>
                      <Col>
                        <CardImg top width="100%" src={houseImageURL} alt="Comment on this house!" />
                      </Col>
                      <Col>
                        <CardBody className="dark-text-color">
                          <CardTitle className="card-title-font">{houseHeadline}</CardTitle>
                          <CardSubtitle className="card-text-font">{houseStreet}, {houseCity}, {houseState}, {houseZip}</CardSubtitle>
                          <CardText className="card-subtitle-font">{(houseForSale ? "This property is for sale" : "This property is for rent")}</CardText>
                        </CardBody>
                      </Col>
                    </Row>
                  </Card>
                </Container>
              </Col>
            </Row>
            <AuthContext.Consumer>
              {authValue => (
                <Formik
                  initialValues={{
                    comment: ""
                  }}
                  validationSchema={Yup.object({
                    comment: Yup.string()
                      .min(1, "Must have at least one character")
                      .required("")
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    // setTimeout(() => {
                    //   alert(JSON.stringify(values, null, 2));
                    //   setSubmitting(false);  
                    // }, 400);

                    // console.log("user: " + authValue.authTokens.username);

                    // let nameURL = "/api/users/comments";
                    // console.log("nameURL: " + nameURL);

                    // axios.get(nameURL).then(() => {
                    //   console.log("/api/users/comments");
                    // })
                    // .catch(err => console.log(err));

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
                    let userName = authValue.authTokens.username;
                    let userImage = authValue.authTokens.userImage;
                    let comment = values.comment

                    axios.post("/api/comments/byhouse", {
                      houseID,
                      userName,
                      userImage,
                      comment
                    })
                      .then(result => {
                        console.log(result);
                        //Increment the new comment submitted state value by one to trigger a re-render of the comments 
                        setNewCommentSubmitted(newCommentSubmitted + 1);
                        //Reset the value of the input field
                        values.comment = '';
                      })
                  }
                  }
                >
                  <Form>
                    <MyTextInput
                      label="Add Comment"
                      name="comment"
                      type="text"
                      placeholder="Enter new comment..."
                    />
                    {/* <button type="submit">Add Comment</button> */}
                  </Form>
                </Formik>
              )}
            </AuthContext.Consumer>
          </Jumbotron>
        </div>
      )
    }
  }
  const renderComments = () => {
    if (commentsReceived) {
      return (
        comments.map(item =>
          <Comment
            name={item.userName}
            image={item.userImage}
            text={item.comment}
            key={item._id}
          />
        )
      )
    }
  }
  return (
    <div>
      {renderHouseInfo()}
      {renderComments()}
    </div>
  )
}

export default HouseDetail;
