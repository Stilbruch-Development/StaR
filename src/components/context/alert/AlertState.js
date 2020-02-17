import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";

import {
  SET_ALERT_MESSAGE,
  REMOVE_ALERT,
  SET_ALERT_BUTTON,
  SET_ALERT_ONCLICK
} from "../types";

const AlertState = props => {
  const initialState = {
    message: "",
    button: "",
    onClickButton: null
  };
  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert Message
  const setAlertMessage = message => {
    dispatch({
      type: SET_ALERT_MESSAGE,
      payload: message
    });
  };

  // Set Alert Message
  const setAlertButton = lable => {
    dispatch({
      type: SET_ALERT_BUTTON,
      payload: lable
    });
  };

  // Set Alert Message
  const setAlertOnClick = func => {
    dispatch({
      type: SET_ALERT_ONCLICK,
      payload: func
    });
  };

  // Remove Alert
  const removeAlert = () => {
    dispatch({
      type: REMOVE_ALERT
    });
  };

  return (
    <AlertContext.Provider
      value={{
        message: state.message,
        button: state.button,
        onClickButton: state.onClickButton,
        setAlertMessage,
        setAlertButton,
        setAlertOnClick,
        removeAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
