import { ActionTypes as types } from '../helpers/constants';

var defaultState = {
  errorMsg: ''
}

const error = (state = defaultState, action) => {
  switch (action.type) {
    case (types.RECEIVED_AJAX_CALL_FAILURE):
      return {
        ...state,
        errorMsg: action.data.msg
      }
    case (types.RECEIVED_FEES_SUCCESS):
      return {
        ...state,
        errorMsg: ''
      }
    default:
      return state;
  }
}

export default error;
