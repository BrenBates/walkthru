import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from './pages/Home/Home';
import Landing from './pages/Landing/Landing';
import HouseDetail from './pages/HouseDetail/HouseDetail';
import UserProfile from './pages/UserProfile/UserProfile';
import Login from './pages/Login/Login';
import Signup from './pages/Signup';
import NavbarComponent from "./pages/Navbar/Navbar"

import NewHouseForm from './pages/NewHouseForm';


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

  
  const logOut = () => {
    setAuthTokens();
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens} }>
      <Router>
        <div>
          {/* <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/landing">Landing Page</Link>
            </li>
            <li>
              <Link to="/NewHouseForm">Add House Form/Page Mockup</Link>
            </li>
      
          </ul> */}
          <NavbarComponent logOut={logOut}/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/api/houses/:id" component={HouseDetail} />
            <PrivateRoute path="/user" component={UserProfile}/>
            <PrivateRoute path="/landing" component={Landing} />
            <PrivateRoute path="/newHouseForm" component={NewHouseForm} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
