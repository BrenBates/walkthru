import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import * as Yup from "yup";
// import styled from "@emotion/styled";
import "../styles.css";
import "../styles-custom.css";
import logoImg from "../img/walkthru.JPG";
import { Formik, Form, useField } from "formik";
import { Card, Logo, Error } from '../components/AuthForm';
import { useAuth } from "../context/auth";

function Signup(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const { setAuthTokens } = useAuth();

  if (isLoggedIn) {
    return <Redirect to="/landing" />;
  }


  //text input for Formik form

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


  return (
    <Card>
      <Logo src={logoImg} />
      <Formik
        initialValues={{
          email: "",
          password: "",
          repassword: ""
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email addresss`")
            .required("Required"),
          password: Yup.string()
            .required('Please Enter your password')
            .max(15, "Must be 15 characters or less")
            .matches(

              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
          repassword: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {

          setErrorText();

          let { username, email, password, repassword } = values

          //If the two passwords do not match, throw the mismatch error.
          if (password !== repassword) {
            setErrorText('The two passwords entered are not the same;');
            setIsError(true);
          } else {

            axios.post("/api/users/register", {
              username,
              email,
              password
            })
              .then(result => {
                if (result.status === 200) {
                  if (result.data.error) {

                    setErrorText(result.data.error)
                    setIsError(true);
                  } else {

                    setAuthTokens(result.data)
                    setLoggedIn(true);
                  }

                } else {
                  setIsError(true);
                }
              }).catch(e => {
                setIsError(true);
              });
          }
        }}


      >
        <Form>
          <MyTextInput
            label="User Name"
            name="username"
            type="text"
            placeholder="user name"
          />
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
            placeholder="password"
          />
          <MyTextInput
            label="Password Again"
            name="repassword"
            type="password"
            placeholder="password again"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
      {isError && <Error>{errorText}</Error>}
    </Card>
  );
}

export default Signup;