import React, { useState } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
=======
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
>>>>>>> 1cdc4522c150b5e641cda86114653be042400f95
=======
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
>>>>>>> 74f9bc46f1413c48dada3f778f73b3b70502f316
import PrivateRoute from './PrivateRoute';
import House from './pages/House';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';

import NewHouseForm from './pages/NewHouseForm';
import HouseDetail from './pages/HouseDetail';

import NoMatch from './pages/NoMatch';
import { AuthContext } from "./context/auth";


function App(props) {
  //Hook with use states for any component using the AuthContext to be
  //able to get and set tokens
  const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens' || ''))

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
        <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/admin">Admin Page</Link>
            </li>
            <li>
              <Link to="/newHouseForm">Add House Form/Page Mockup</Link>
            </li>
            <li>
              <Link to="/HouseDetail">House Detail Page Mockup</Link>
            </li>
          </ul>
          <Switch>
<<<<<<< HEAD
<<<<<<< HEAD
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/admin" component={Admin} />
            <Route path="/house/:id" component={House} />
            <Route path="/houses" component={House} />
=======
=======
>>>>>>> 74f9bc46f1413c48dada3f778f73b3b70502f316
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/admin" component={Admin} />
          <Route path="/house/:id" component={House} />
          <Route component={NoMatch} />
          <Route path="/houses" component={House} />
          <Route path="/newHouseForm" component={NewHouseForm} />
          <Route path="/HouseDetails" component={HouseDetail} />
<<<<<<< HEAD
 
>>>>>>> 1cdc4522c150b5e641cda86114653be042400f95
=======

>>>>>>> 74f9bc46f1413c48dada3f778f73b3b70502f316
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
