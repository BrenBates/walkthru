import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import * as Yup from "yup";
import "../../styles.css";
import "../../styles-custom.css";
import logoImg from "../../img/walkthru.JPG";
import { Formik, Form, useField } from "formik";
import { Card, Logo, Error } from '../../components/AuthForm';
import { useAuth } from "../../context/auth";



function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError,setIsError] = useState(false)
    const [errorText, setErrorText] = useState('');
    const { setAuthTokens } = useAuth();
    
    //referer state will be used in the event that a user
    //that is not yet logged in tries to log in.  The private route 
    //will first redirect them to the login page, but will set the referer
    //state to the page they were trying to access.  After they login,
    //they can then be redirected back to the page they were originally
    //trying to access.
    const referer = props.location.state.referer || '/';


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


    if (isLoggedIn) {
        return <Redirect to={referer} />;
    }

  return (
    <Card>
      <Logo src={logoImg} />
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
          .max(15,"Must be 15 characters or less")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);  
        // }, 400);

        let {email,password} = values

        axios.post("/api/users/login", {
          email,
          password
      })
      .then(result => {
          if (result.status === 200) {
          
            if (result.data.error) {
              setErrorText(result.data.error)
              setIsError(true)
            } else {

              //Set the auth token along with the user data into the context
              setAuthTokens(result.data)              
              setLoggedIn(true);

            }
              
            
          } else {
              setIsError(true);
          }
      }).catch(e => {
          setIsError(true);
      });

      }}
      >
        <Form>
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
                placeholder="passsword"
            />
        
            <button type="submit">Submit</button>
        </Form>
    </Formik>

      <Link to="/signup">Don't have an account?</Link>
        { isError &&<Error>{errorText}</Error>}
    </Card>
  );
}

export default Login;