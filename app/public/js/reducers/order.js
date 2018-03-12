import { ActionTypes as types } from '../helpers/constants';

const defaultState = {
  username: ''
};

const order = (state = defaultState, action) => {
  switch (action.type) {
    case (types.CHANGE_USERNAME):
      return {
        ...state,
        username: action.data.username
     }
    case (types.ORDER_SUBMIT):
      return {
        ...state
     }
    default:
      return state;
  }
}

export default order;