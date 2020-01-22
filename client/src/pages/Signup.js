import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import * as Yup from "yup";
import styled from "@emotion/styled";
import "../styles.css";
import "../styles-custom.css";
import logoImg from "../img/walkthru.JPG";
import { Formik, Form, useField } from "formik";
import { Card, Logo, Error } from '../components/AuthForm';
import { useAuth } from "../context/auth";

function Signup(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError,setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const { setAuthTokens } = useAuth();

    if (isLoggedIn) {
        return <Redirect to="/admin" />;
    }

    // Styled components ....
const StyledSelect = styled.select`
color: var(--blue);
`;

const StyledErrorMessage = styled.div`
font-size: 12px;
color: var(--red-600);
width: 400px;
margin-top: 0.25rem;
&:before {
  content: "❌ ";
  font-size: 10px;
}
@media (prefers-color-scheme: dark) {
  color: var(--red-300);
}
`;

const StyledLabel = styled.label`
margin-top: 1rem;
`;

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
        .max(15,"Must be 15 characters or less")
        .required("Required"),
        email: Yup.string()
          .email("Invalid email addresss`")
          .required("Required"),
        password: Yup.string()
          .max(15,"Must be 15 characters or less")
          .required("Required"),
        repassword: Yup.string()
          .max(15,"Must be 15 characters or less")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);  
        // }, 400);
         setErrorText();
        
        
        let {username,email,password,repassword} = values

        //If the two passwords do not match, throw the mismatch error.
        if(password !== repassword) {
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
              if(result.data.error) {
                  
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
                type="text"
                placeholder="password"
            />
            <MyTextInput
                label="Password Again"
                name="repassword"
                type="text"
                placeholder="password again"
            />

            <button type="submit">Submit</button>
      </Form>
      </Formik>
      <Link to="/login">Already have an account?</Link>
        {/* { mismatchError &&<Error>The two password fields must be the same!</Error>} */}
        { isError &&<Error>{errorText}</Error>}
    </Card>
  );
}

export default Signup;