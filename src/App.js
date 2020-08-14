import React, { Component } from "react";
import "./App.css";
import Navbar from "./Components/layout/Navbar";
import Users from "./Components/users/Users";
import Search from "./Components/users/Search";
import Alert from "./Components/layout/Alert";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
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
    const { loading, users } = this.state;

    return (
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github" />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Search
            searchUser={this.searchUser}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
