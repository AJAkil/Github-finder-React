import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  
  // Setting up the alert
  const setAlert = (msg, alertType) => {
      dispatch({
          type: SET_ALERT,
          payload: { msg, alertType }
      });

    // Setting a timeout of 3 Seconds, so that after 3 seconds, the alert
    // goes away
    setTimeout(() => dispatch({type: REMOVE_ALERT}), 3000);
  };


  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
