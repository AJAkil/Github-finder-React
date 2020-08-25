import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/layout/Navbar";
import Users from "./Components/users/Users";
import SingleUser from "./Components/users/SingleUser";
import Search from "./Components/users/Search";
import Alert from "./Components/layout/Alert";
import About from "./Components/pages/About";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: [],
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });

    const response = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      users: response.data,
      loading: false,
    });
  }

  // Search for a single Github user
  searchUser = async (text) => {
    this.setState({
      loading: true,
    });

    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      users: response.data.items,
      loading: false,
    });
  };

  // Get a single user
  getUser = async (username) => {
    this.setState({
      loading: true,
    });

    const response = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      user: response.data,
      loading: false,
    });
  };

  // Get User Repo
  getUserRepos = async (username) => {
    this.setState({
      loading: true,
    });

    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      repos: response.data,
      loading: false,
    });
  };

  // Clear users from the state
  clearUsers = () => {
    this.setState({
      users: [],
      loading: false,
    });
  };

  // Setting up the alert
  setAlert = (msg, alertType) => {
    this.setState({
      alert: { message: msg, type: alertType },
    });

    // Setting a timeout of 3 Seconds, so that after 3 seconds, the alert
    // goes away
    setTimeout(
      () =>
        this.setState({
          alert: null,
        }),
      3000
    );
  };

  render() {
    const { loading, users, user, repos } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icon="fab fa-github" />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUser={this.searchUser}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <SingleUser
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    loading={loading}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
