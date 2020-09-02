import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import GithubContext from '../../context/github/githubContext';
import AlertContext from "../../context/alert/alertContext";

const Search = () => {

  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      alertContext.setAlert("Please Enter Something in the form!", "danger");
    } else {
      githubContext.searchUser(text);
      setText('');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          placeholder="Search Users..."
          name="text"
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>

      {githubContext.users.length > 0 && (
        <button onClick={githubContext.clearUsers} className="btn btn-light btn-block">
          Clear
        </button>
      )}
    </div>
  );
};



export default Search;
