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

export default function(state, action) {
  switch (action.type) {
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
        cardsUserData: null,
        error: null,
        selectedCardsItem: null
      };
    case SELECT_CARDS_ITEM:
      return {
        ...state,
        selectedCardsItem: action.payload
      };
    case LOCK_CARDS_EDITOR:
      return {
        ...state,
        editorLocked: action.payload
      };
    case SET_CARDS_EDITOR:
      return {
        ...state,
        cardsEditorState: action.payload
      };
    default:
      return state;
  }
}
