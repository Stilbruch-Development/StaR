import React, { useReducer, useContext } from 'react';
import { v4 as uuid4 } from 'uuid';
import ExpanderContext from './expanderContext';
import expanderReducer from './expanderReducer';
import AlertContext from '../alert/alertContext';
import { expander_db } from '../../../pouchdb/db';
import AuthContext from '../auth/authContext';

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
  SET_EXPANDER_EDITOR
} from '../types';

const ExpanderState = (props) => {
  const { children } = props;
  const initialState = {
    loadingExpander: false,
    expanderUserData: null,
    selectedExpanderItem: null,
    expanderEditorState: null,
    editorLocked: true,
    error: null
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
          selector: { user: user._id }
        });
        dispatch({
          type: GET_EXPANDER_SUCCESS,
          payload: data.docs
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
      long: longState
    };

    const duplicat = await expander_db.find({
      selector: { short: item.short, user: user._id }
    });

    try {
      if (duplicat.docs.length === 0) {
        await expander_db.put(item).then(
          dispatch({
            type: ADD_EXPANDER_ITEM,
            payload: item
          })
        );
      } else {
        dispatch({ type: EXPANDER_ERROR });
        setAlert({
          item: 'message',
          value: 'Kürzel ist bereits vorhanden und wurde nicht gespeichert !!'
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: EXPANDER_ERROR, payload: err });
      setAlert({
        item: 'message',
        value: 'Login-Berrechtigung ist abgelaufen. Bitte melde dich erneut an.'
      });
    }
  };

  // DELETE_EXPANDER
  const deleteExpander = async (id) => {
    try {
      const doc = await expander_db.get(id);
      await expander_db.remove(doc).then(
        dispatch({
          type: DELETE_EXPANDER,
          payload: id
        })
      );
    } catch (err) {
      dispatch({ type: EXPANDER_ERROR, payload: err });
      setAlert({
        item: 'message',
        value: 'Login-Berrechtigung ist abgelaufen. Bitte melde dich erneut an.'
      });
    }
  };

  // UPDATE_EXPANDER
  const updateExpander = async (itemElements, longState) => {
    const item = { ...itemElements, long: longState };
    try {
      const doc = await expander_db.get(item._id);
      await expander_db
        .put({
          ...item,
          _rev: doc._rev
        })
        .then(
          dispatch({
            type: UPDATE_EXPANDER,
            payload: item
          })
        );
    } catch (err) {
      dispatch({ type: EXPANDER_ERROR, payload: err });
      setAlert({
        item: 'message',
        value: 'Login-Berrechtigung ist abgelaufen. Bitte melde dich erneut an.'
      });
    }
  };

  // CLEAR_EXPANDER
  const clearExpander = () => {
    dispatch({
      type: CLEAR_EXPANDER
    });
  };

  // SELECT_EXPANDER_ITEM
  const selectExpanderItem = (item) => {
    dispatch({
      type: SELECT_EXPANDER_ITEM,
      payload: item
    });
  };

  // LOCK_EXPANDER_EDITOR
  const lockEditor = (boolean) => {
    dispatch({
      type: LOCK_EXPANDER_EDITOR,
      payload: boolean
    });
  };

  // SET_EDITOR_STATE
  const setExpanderEditor = (e) => {
    dispatch({
      type: SET_EXPANDER_EDITOR,
      payload: e
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
        editorLocked: state.editorLocked
      }}
    >
      {children}
    </ExpanderContext.Provider>
  );
};

export default ExpanderState;
