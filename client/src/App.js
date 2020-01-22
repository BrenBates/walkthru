import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import House from './pages/House';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
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
          </ul>
          <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/admin" component={Admin} />
          <Route path="/house/:id" component={House} />
          <Route component={NoMatch} />
          </Switch>
          
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
