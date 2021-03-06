import React, { useReducer, useContext } from "react";
import ExpanderContext from "./expanderContext";
import expanderReducer from "./expanderReducer";
import AlertContext from "../../context/alert/alertContext";
import { expander_db } from "../../../pouchdb/db";
import { v4 as uuid4 } from 'uuid';
import AuthContext from "../../context/auth/authContext";

import {
  GET_EXPANDER,
  GET_EXPANDER_SUCCESS,
  CLEAR_EXPANDER,
  ADD_EXPANDER_ITEM,
  UPDATE_EXPANDER,
  EXPANDER_ERROR,
  SELECT_EXPANDER_ITEM,
  DELETE_EXPANDER,
  LOCK_EXPANDER_EDITOR,
  SET_EXPANDER_EDITOR,
} from "../types";

const ExpanderState = (props) => {
  const initialState = {
    loadingExpander: false,
    expanderUserData: null,
    selectedExpanderItem: null,
    expanderEditorState: null,
    editorLocked: true,
    error: null,
  };

  const [state, dispatch] = useReducer(expanderReducer, initialState);
  const { setAlert } = useContext(AlertContext);
  const { user } = useContext(AuthContext);

  // GET_EXPANDER;
  const getExpander = async () => {
    dispatch({ type: GET_EXPANDER });
    if (user !== null) {
      try {
        const data = await expander_db.find({
          selector: { user: user._id },
        });
        dispatch({
          type: GET_EXPANDER_SUCCESS,
          payload: data.docs,
        });
      } catch (err) {
        dispatch({ type: EXPANDER_ERROR, payload: err });
      }
    }
  };

  // ADD_EXPANDER_ITEM,
  const addExpanderItem = async (itemElements, longState) => {
    const item = {
      ...itemElements,
      _id: uuid4(),
      user: user._id,
      long: longState,
    };
    try {
      await expander_db.put(item).then(
        dispatch({
          type: ADD_EXPANDER_ITEM,
          payload: item,
        })
      );
    } catch (err) {
      dispatch({ type: EXPANDER_ERROR, payload: err });
      setAlert({
        item: "message",
        value:
          "Login-Berrechtigung ist abgelaufen. Bitte melde dich erneut an.",
      });
    }
  };

  //DELETE_EXPANDER
  const deleteExpander = async (id) => {
    try {
      var doc = await expander_db.get(id);
      await expander_db.remove(doc).then(
        dispatch({
          type: DELETE_EXPANDER,
          payload: id,
        })
      );
    } catch (err) {
      dispatch({ type: EXPANDER_ERROR, payload: err });
      setAlert({
        item: "message",
        value:
          "Login-Berrechtigung ist abgelaufen. Bitte melde dich erneut an.",
      });
    }
  };

  // UPDATE_EXPANDER
  const updateExpander = async (itemElements, longState) => {
    const item = { ...itemElements, long: longState };
    try {
      var doc = await expander_db.get(item._id);
      await expander_db
        .put({
          ...item,
          _rev: doc._rev,
        })
        .then(
          dispatch({
            type: UPDATE_EXPANDER,
            payload: item,
          })
        );
    } catch (err) {
      dispatch({ type: EXPANDER_ERROR, payload: err });
      setAlert({
        item: "message",
        value:
          "Login-Berrechtigung ist abgelaufen. Bitte melde dich erneut an.",
      });
    }
  };

  // CLEAR_EXPANDER
  const clearExpander = () => {
    dispatch({
      type: CLEAR_EXPANDER,
    });
  };

  // SELECT_EXPANDER_ITEM
  const selectExpanderItem = (item) => {
    dispatch({
      type: SELECT_EXPANDER_ITEM,
      payload: item,
    });
  };

  // LOCK_EXPANDER_EDITOR
  const lockEditor = (boolean) => {
    dispatch({
      type: LOCK_EXPANDER_EDITOR,
      payload: boolean,
    });
  };

  // SET_EDITOR_STATE
  const setExpanderEditor = (state) => {
    dispatch({
      type: SET_EXPANDER_EDITOR,
      payload: state,
    });
  };

  return (
    <ExpanderContext.Provider
      value={{
        expanderUserData: state.expanderUserData,
        loadingExpander: state.loadingExpander,
        error: state.error,
        selectedExpanderItem: state.selectedExpanderItem,
        expanderEditorState: state.expanderEditorState, // expanderEditorState === ContentState !!
        getExpander,
        addExpanderItem,
        deleteExpander,
        updateExpander,
        clearExpander,
        selectExpanderItem,
        lockEditor,
        setExpanderEditor,
        editorLocked: state.editorLocked,
      }}
    >
      {props.children}
    </ExpanderContext.Provider>
  );
};

export default ExpanderState;
