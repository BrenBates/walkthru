import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as Yup from "yup";
import { Formik, Form, useField } from "formik";
import '../HouseDetail/housedetail.css'
import {
  Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle
} from 'reactstrap';
import Comment from "../../components/Comment"
import { AuthContext } from "../../context/auth";

function HouseDetail(props) {

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


  // Get all the data related to the current house to the user
  useEffect(() => {

    let houseURL = '/api/houses/' + props.match.params.id

    const populateHouseInfo = () => {

      axios.get(houseURL)
        .then((res) => {

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

    populateHouseInfo()
  }, [props.match.params.id]);

  // Get the latest comments loaded to the page
  useEffect(() => {

    loadComments(props.match.params.id)

  }, [newCommentSubmitted, props.match.params.id]);


  const loadComments = (id) => {
    let queryURL = "/api/comments/byhouse/" + id;
    axios.get(queryURL).then(res => {
      setComments(res.data)
      setCommentsReceived(true)
    })
  }

  const renderHouseInfo = () => {
    if (houseInfoReceived) {
      return (
        <div>

          <Row>
            <Col>
              <Container>
                <Card>
                  <Row>
                    <Col>
                      <CardImg top width="100%" src={houseImageURL} alt="Card image cap" />
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
                      console.log('made it back');
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
