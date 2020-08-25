import React, { Component } from "react";
import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class SingleUser extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
  };
  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    this.props.getUser(params.login);
    this.props.getUserRepos(params.login);
  }
  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      company,
      hireable,
    } = this.props.user;

    const { loading, repos } = this.props;

    if (loading) return <Spinner />;

    return (
      <div>
        <Link to="/" className="btn btn-light">
          Back To search
        </Link>
        Hireable:{" "}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              alt=""
              className="round-img"
              style={{ width: "150px" }}
            />
            <h1>{name}</h1>
            <p>{location}</p>
          </div>
          <div>
            {bio && (
              <div>
                <h3>Bio</h3>
                <p>{bio}</p>
              </div>
            )}

            <a href={html_url} className="btn btn-dark my-1">
              Visit Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <div>
                    <strong>Username: </strong>
                    {login}
                  </div>
                )}
              </li>
              <li>
                {company && (
                  <div>
                    <strong>Company: </strong>
                    {company}
                  </div>
                )}
              </li>
              <li>
                {blog && (
                  <div>
                    <strong>Website: </strong>
                    <a href={blog} className="btn btn-link my-1">
                      {blog}
                    </a>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-danger">Public Repos: {public_repos}</div>
          <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
        
        <Repos repos={repos}/>
      </div>
    );
  }
}

export default SingleUser;
