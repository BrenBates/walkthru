import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import Landing from './pages/Landing/Landing';
import HouseDetail from './pages/HouseDetail/HouseDetail';
import Login from './pages/Login';
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
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
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
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/house/:id" component={HouseDetail} /* Change back to PrivateRoute *//>
            <PrivateRoute path="/landing" component={Landing} /* Change back to PrivateRoute *//>
            <PrivateRoute path="/newHouseForm" component={NewHouseForm} /* Change back to PrivateRoute *//>
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
