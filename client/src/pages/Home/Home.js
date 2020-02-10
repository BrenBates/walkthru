import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import Login from "../Login/Login";
import { Logo } from '../../components/AuthForm';
import logoImg from "../../img/walkthru2.png";
import '../Home/home.css'

function Home(props) {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false)
    const [errorText, setErrorText] = useState('');

    const setErr = (error) => { setIsError(error) }
    const setLog = (value) => { setLoggedIn(value) }
    const setErrText = (text) => { setErrorText(text) }

    // Optional chaining
    const referer = props.location?.state?.referer || '/landing';

    if (isLoggedIn) { return <Redirect to={referer} />; }

    return <div>
        <div className="bgImage"></div>
        <div className="logo-container">
            <Logo className="logo" src={logoImg} />
            <div className="login-form">
                <Login
                    setLogIn={setLog}
                    setErr={setErr}
                    setErrText={setErrText}
                    isError={isError}
                    errorText={errorText}
                />
            </div>
        </div>
        {/* <div className="parallax-demo">LOGIN</div> */}
    </div>;
}


export default Home;