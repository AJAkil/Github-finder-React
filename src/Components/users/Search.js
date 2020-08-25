import React, { Component } from "react";
import PropTypes from "prop-types";


export class Search extends Component {
  state = {
    text: "",
  };

  static propTypes = {
    searchUser: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.text === "") {
      this.props.setAlert("Please Enter Something in the form!", "danger");
    } else {
      this.props.searchUser(this.state.text);
      this.setState({
        text: "",
      });
    }
  };

  render() {
    const { showClear, clearUsers } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            placeholder="Search Users..."
            name="text"
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>

        {showClear && (
          <button onClick={clearUsers} className="btn btn-light btn-block">
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
