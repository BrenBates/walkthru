import React from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import * as Yup from "yup";
import "../../styles.css";
import "../../styles-custom.css";
import "../Login/login.css";
import { Formik, Form, useField } from "formik";
import { Card, Logo, Error } from '../../components/AuthForm';
import { useAuth } from "../../context/auth";
import { Label, FormGroup } from "reactstrap";

function Login(props) {
  const { setAuthTokens } = useAuth();

  //referer state will be used in the event that a user
  //that is not yet logged in tries to log in.  The private route 
  //will first redirect them to the login page, but will set the referer
  //state to the page they were trying to access.  After they login,
  //they can then be redirected back to the page they were originally
  //trying to access.
  //  const referer = props.location.state.referer || '/landing';
  // console.log("props.location:  ", props);

  //text input for Formik form
  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <FormGroup>
        <Label className="label-login" for={props.id || props.name}>{label}</Label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </FormGroup>
    );
  };

  return (
    <Card>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email addresss`")
            .required("Required"),
          password: Yup.string()
            .required('Please Enter your password')
            .max(15,"Must be 15 characters or less")
            .matches(
              
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);  
          // }, 400);

          let { email, password } = values;

          axios.post("/api/users/login", {
            email,
            password
          })
            .then(result => {
              if (result.status === 200) {

                if (result.data.error) {
                  props.setErrText(result.data.error)
                  props.setErr(true)
                } else {
                  //Set the auth token along with the user data into the context
                  setAuthTokens(result.data)
                  props.setLogIn(true);
                }

              } else {
                props.setErr(true);
              }
            }).catch(e => {
              props.setErr(true);
            });
        }}
      >
        <Form>
          <div className="margin-top-login" />
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="example@gmail.com"
          />
          <MyTextInput
            label="Password"
            name="password"
            type="password"
            placeholder=" password"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>

      <Link className="ref-link" to="/signup">Don't have an account?</Link>
      {props.isError && <Error>{props.errorText}</Error>}
    </Card>
  );
}

export default Login;