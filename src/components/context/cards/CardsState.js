import React, { useReducer, useContext } from "react";
import CardsContext from "./cardsContext";
import cardsReducer from "./cardsReducer";
import AlertContext from "../alert/alertContext";
import { cards_db } from "../../../pouchdb/db";
import uuid4 from "uuid/v4";
import AuthContext from "../auth/authContext";

import {
  ADD_CARDS_ITEM,
  DELETE_CARDS,
  GET_CARDS,
  GET_CARDS_SUCCESS,
  UPDATE_CARDS,
  CLEAR_CARDS,
  CARDS_ERROR,
  SELECT_CARDS_ITEM,
  LOCK_CARDS_EDITOR,
  SET_CARDS_EDITOR
} from "../types";

const CardsState = props => {
  const initialState = {
    loading: false,
    cardsUserData: null,
    selectedCardsItem: null,
    cardsEditorState: null,
    editorLocked: true,
    error: null
  };

  const [state, dispatch] = useReducer(cardsReducer, initialState);
  const { setAlert } = useContext(AlertContext);
  const { user } = useContext(AuthContext);

  // GET_CARDS;
  const getCards = async () => {
    dispatch({ type: GET_CARDS });
    if (user !== null) {
      try {
        const data = await cards_db.find({
          selector: { user: user._id }
        });
        dispatch({
          type: GET_CARDS_SUCCESS,
          payload: data.docs
        });
      } catch (err) {
        dispatch({ type: CARDS_ERROR, payload: err });
      }
    }
  };

  // ADD_CARDS_ITEM,
  const addCardsItem = async (itemElements, longState) => {
    const item = {
      ...itemElements,
      _id: uuid4(),
      user: user._id,
      long: longState
    };
    try {
      await cards_db.put(item).then(
        dispatch({
          type: ADD_CARDS_ITEM,
          payload: item
        })
      );
    } catch (err) {
      dispatch({ type: CARDS_ERROR, payload: err });
      setAlert(
        "Login-Berrechtigung ist abgelaufen. Bitte melde dich erneut an."
      );
    }
  };

  //DELETE_CARDS
  const deleteCards = async id => {
    try {
      var doc = await cards_db.get(id);
      await cards_db.remove(doc).then(
        dispatch({
          type: DELETE_CARDS,
          payload: id
        })
      );
    } catch (err) {
      dispatch({ type: CARDS_ERROR, payload: err });
      setAlert(
        "Login-Berrechtigung ist abgelaufen. Bitte melde dich erneut an."
      );
    }
  };

  // UPDATE_CARDS
  const updateCards = async (itemElements, longState) => {
    const item = { ...itemElements, long: longState };
    try {
      var doc = await cards_db.get(item._id);
      await cards_db
        .put({
          ...item,
          _rev: doc._rev
        })
        .then(
          dispatch({
            type: UPDATE_CARDS,
            payload: item
          })
        );
    } catch (err) {
      dispatch({ type: CARDS_ERROR, payload: err });
      setAlert(
        "Login-Berrechtigung ist abgelaufen. Bitte melde dich erneut an."
      );
    }
  };

  // CLEAR_CARDS
  const clearCards = () => {
    dispatch({
      type: CLEAR_CARDS
    });
  };

  // SELECT_CARDS_ITEM
  const selectCardsItem = item => {
    dispatch({
      type: SELECT_CARDS_ITEM,
      payload: item
    });
  };

  // LOCK_CARDS_EDITOR
  const lockEditor = boolean => {
    dispatch({
      type: LOCK_CARDS_EDITOR,
      payload: boolean
    });
  };

  // SET_EDITOR_STATE
  const setCardsEditor = state => {
    dispatch({
      type: SET_CARDS_EDITOR,
      payload: state
    });
  };

  return (
    <CardsContext.Provider
      value={{
        cardsUserData: state.cardsUserData,
        loading: state.loading,
        error: state.error,
        selectedCardsItem: state.selectedCardsItem,
        cardsEditorState: state.cardsEditorState, // expanderEditorState === ContentState !!
        getCards,
        addCardsItem,
        deleteCards,
        updateCards,
        clearCards,
        selectCardsItem,
        lockEditor,
        setCardsEditor,
        editorLocked: state.editorLocked
      }}
    >
      {props.children}
    </CardsContext.Provider>
  );
};

export default CardsState;
