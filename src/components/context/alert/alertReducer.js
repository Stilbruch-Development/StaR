import { REMOVE_ALERT, SET_ALERT_STATE } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT_STATE: {
      const { item, value } = action.payload;

      return {
        ...state,
        [item]: value
      };
    }
    case REMOVE_ALERT:
      return {
        message: '',
        button: '',
        color: 'rgba(255, 184, 191, 0.8)',
        onClickButton: null
      };
    default:
      return state;
  }
};
