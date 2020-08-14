import React, { Fragment } from "react";
import spinner from "./spinner.gif";

export const Spinner = () => (
  <Fragment>
    <img src={spinner} alt="Loading..." style={imageStyle} />
  </Fragment>
);

const imageStyle = {
  width: "200px",
  margin: "auto",
  display: "block",
};

export default Spinner;
