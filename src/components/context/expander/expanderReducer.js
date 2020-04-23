import {
  GET_EXPANDER,
  GET_EXPANDER_SUCCESS,
  ADD_EXPANDER_ITEM,
  UPDATE_EXPANDER,
  DELETE_EXPANDER,
  CLEAR_EXPANDER,
  EXPANDER_ERROR,
  SELECT_EXPANDER_ITEM,
  LOCK_EXPANDER_EDITOR,
  SET_EXPANDER_EDITOR
} from "../types";

export default function(state, action) {
  switch (action.type) {
    case ADD_EXPANDER_ITEM:
      return {
        ...state,
        expanderUserData: [...state.expanderUserData, action.payload],
        loadingExpander: false
      };
    case UPDATE_EXPANDER:
      return {
        ...state,
        expanderUserData: state.expanderUserData.map(expander =>
          expander._id === action.payload._id ? action.payload : expander
        ),
        loadingExpander: false
      };
    case DELETE_EXPANDER:
      return {
        ...state,
        expanderUserData: state.expanderUserData.filter(
          expander => expander._id !== action.payload
        ),
        loadingExpander: false
      };
    case EXPANDER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case GET_EXPANDER:
      return {
        ...state,
        loadingExpander: true
      };
    case GET_EXPANDER_SUCCESS:
      return {
        ...state,
        expanderUserData: action.payload,
        loadingExpander: false
      };
    case CLEAR_EXPANDER:
      return {
        ...state,
        expanderUserData: null,
        error: null,
        selectedExpanderItem: null
      };
    case SELECT_EXPANDER_ITEM:
      return {
        ...state,
        selectedExpanderItem: action.payload
      };
    case LOCK_EXPANDER_EDITOR:
      return {
        ...state,
        editorLocked: action.payload
      };
    case SET_EXPANDER_EDITOR:
      return {
        ...state,
        expanderEditorState: action.payload
      };
    default:
      return state;
  }
}
