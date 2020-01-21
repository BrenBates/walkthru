
import React from "react";
import { Button } from "../components/AuthForm";
import { useAuth } from "../context/auth";

function House(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
  }

  return (
    <div>
      <div>House Page</div>
      <Button onClick={logOut}>Log out</Button>
      
    </div>
  );
}

// headline: { type: String },
//     houseImageURL: { type: String },
//     street: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     zip: { type: Number, required: true },
//     lat: { type: Number },
//     long: { type: Number }

export default House;
