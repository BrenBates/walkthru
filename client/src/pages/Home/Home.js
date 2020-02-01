import React from "react";
import Login from "../Login/Login";
import { Logo } from '../../components/AuthForm';
import logoImg from "../../img/walkthru.JPG";
import '../Home/home.css'

function Home(props) {

    function signin(props) {
        return (
            <div className="parallax-login">Walkthru</div>
        )
    }
    return <div>
        <div className="bgImage"></div>
        <div className="logo-container">
            <Logo className="logo" src={logoImg} />
            <div className="login-form">
                <Login />
            </div>
        </div>
        <div className="parallax-demo">LOGIN</div>
    </div>;
}


export default Home;