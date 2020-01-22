import React from "react";
//import axios from 'axios';
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";

function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens } = useAuth();
  
  // const validateToken = token => {

  //   axios.get("/api/users/validatetoken", token)
    
  //   console.log(token)
  //   if(token) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  return (
    <Route
      {...rest}
      render={props =>
        authTokens ? (
          <Component {...props} />
        ) : (
          <Redirect 
          to={{ pathname: "/login", state: { referer: props.location}}} 
          />
        )
      }
    />
  );
}

export default PrivateRoute;