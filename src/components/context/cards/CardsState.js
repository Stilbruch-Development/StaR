import React, { useReducer, useContext } from 'react';
import { v4 as uuid4 } from 'uuid';
import CardsContext from './cardsContext';
import cardsReducer from './cardsReducer';
import AlertContext from '../alert/alertContext';
import { cards_db } from '../../../pouchdb/db';
import AuthContext from '../auth/authContext';

import {
  ADD_CARDS_ITEM,
  DELETE_CARDS,
  GET_CARDS,
  GET_CARDS_SUCCESS,
  UPDATE_CARDS,
  CLEAR_CARDS,
  CARDS_ERROR,
  SET_CARDS_STATE
} from '../types';

const CardsState = (props) => {
  const { children } = props;
  const initialState = {
    loadingCards: false,
    cardsUserData: null,
    selectedCardsItem: null,
    cardsFormState: null,
    editingCards: false,
    error: null
  };

  const [state, dispatch] = useReducer(cardsReducer, initialState);
  const { setAlert } = useContext(AlertContext);
  const { user } = useContext(AuthContext);

  // SET_CARDS_STATE item as string!
  const setCardsState = (item, value) => {
    dispatch({
      type: SET_CARDS_STATE,
      payload: { item, value }
    });
  };

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
  const addCardsItem = async (itemElements, formData) => {
    const item = {
      ...itemElements,
      ...formData,
      _id: uuid4(),
      user: user._id
    };

    const duplicat = await cards_db.find({
      selector: { name: item.name, user: user._id }
    });

    try {
      if (duplicat.docs.length === 0) {
        await cards_db.put(item).then(
          dispatch({
            type: ADD_CARDS_ITEM,
            payload: item
          })
        );
      } else {
        dispatch({ type: CARDS_ERROR });
        setAlert({
          item: 'message',
          value:
            'Karten-Name ist bereits vorhanden! Bitte keine Doppeleinträge.'
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: CARDS_ERROR, payload: err });
      setAlert({
        item: 'message',
        value: 'Login-Berrechtigung ist abgelaufen. Bitte melde dich erneut an.'
      });
    }
  };

  // DELETE_CARDS
  const deleteCards = async (id) => {
    try {
      const doc = await cards_db.get(id);
      await cards_db.remove(doc).then(
        dispatch({
          type: DELETE_CARDS,
          payload: id
        })
      );
    } catch (err) {
      dispatch({ type: CARDS_ERROR, payload: err });
      setAlert({
        item: 'message',
        value: 'Login-Berrechtigung ist abgelaufen. Bitte melde dich erneut an.'
      });
    }
  };

  // UPDATE_CARDS
  const updateCards = async (newItemElements, cardsFormState) => {
    const item = { ...newItemElements, ...cardsFormState };

    try {
      const doc = await cards_db.get(item._id);
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
      setAlert({
        item: 'message',
        value: 'Login-Berrechtigung ist abgelaufen. Bitte melde dich erneut an.'
      });
    }
  };

  // CLEAR_CARDS
  const clearCards = () => {
    dispatch({
      type: CLEAR_CARDS
    });
  };

  return (
    <CardsContext.Provider
      value={{
        cardsUserData: state.cardsUserData,
        loadingCards: state.loadingCards,
        error: state.error,
        selectedCardsItem: state.selectedCardsItem,
        cardsFormState: state.cardsFormState,
        editingCards: state.editingCards,
        getCards,
        addCardsItem,
        deleteCards,
        updateCards,
        clearCards,
        setCardsState
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export default CardsState;
