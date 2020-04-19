import {
  ADD_CARDS_ITEM,
  DELETE_CARDS,
  GET_CARDS,
  GET_CARDS_SUCCESS,
  UPDATE_CARDS,
  CLEAR_CARDS,
  CARDS_ERROR,
  SET_CARDS_STATE
} from "../types";

export default function(state, action) {
  switch (action.type) {
    case SET_CARDS_STATE:
      const { item, value } = action.payload;
      return {
        ...state,
        [item]: value
      };
    case ADD_CARDS_ITEM:
      return {
        ...state,
        cardsUserData: [...state.cardsUserData, action.payload],
        loading: false
      };
    case UPDATE_CARDS:
      return {
        ...state,
        cardsUserData: state.cardsUserData.map(cards =>
          cards._id === action.payload._id ? action.payload : cards
        ),
        loading: false
      };
    case DELETE_CARDS:
      return {
        ...state,
        cardsUserData: state.cardsUserData.filter(
          cards => cards._id !== action.payload
        ),
        loading: false
      };
    case CARDS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case GET_CARDS:
      return {
        ...state,
        loading: true
      };
    case GET_CARDS_SUCCESS:
      return {
        ...state,
        cardsUserData: action.payload,
        loading: false
      };
    case CLEAR_CARDS:
      return {
        ...state,
        error: null,
        selectedCardsItem: null,
        editingCards: false
      };
    default:
      return state;
  }
}
