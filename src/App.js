import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/layout/Navbar";
import Users from "./Components/users/Users";
import SingleUser from "./Components/users/SingleUser";
import Search from "./Components/users/Search";
import Alert from "./Components/layout/Alert";
import About from "./Components/pages/About"; 

import GithubState from "./context/github/GithubState";

const App = () => {
  const [alert, setAlert] = useState(null);

  // Setting up the alert
  const showAlert = (msg, alertType) => {
    setAlert({ message: msg, type: alertType });

    // Setting a timeout of 3 Seconds, so that after 3 seconds, the alert
    // goes away
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icon="fab fa-github" />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search setAlert={showAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" component={SingleUser} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
