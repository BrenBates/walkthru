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

function Login(props) {
  const { setAuthTokens } = useAuth();

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
            .max(15, "Must be 15 characters or less")
            .matches(

              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        })}
        onSubmit={(values, { setSubmitting }) => {

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
          <div className="margin-top" />
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