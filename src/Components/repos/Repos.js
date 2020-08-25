import React from "react";
import Repo from "./Repo";
import PropTypes from "prop-types";

export const Repos = ({ repos }) => {
  return repos.map((repo) => <Repo repo={repo} key={repo.id} />);
};

Repos.prototype = {
  repos: PropTypes.array.isRequired,
};

export default Repos;
