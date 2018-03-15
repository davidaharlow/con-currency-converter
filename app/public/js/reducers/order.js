import { ActionTypes as types } from '../helpers/constants';

const defaultState = {
  username: '',
  date: '',
  mostRecentOriginAmount: 0,
  mostRecentOriginCurrency: 'USD',
  mostRecentDestinationAmount: 0,
  mostRecentDestinationCurrency: 'USD'
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
        ...state,
        date: action.data.date,
        mostRecentOriginAmount: action.data.mostRecentOriginAmount,
        mostRecentOriginCurrency: action.data.mostRecentOriginCurrency,
        mostRecentDestinationAmount: action.data.mostRecentDestinationAmount,
        mostRecentDestinationCurrency: action.data.mostRecentDestinationCurrency
     }
    case (types.RETREIVE_RECENT_ORDER):
      return {
        ...state,
        date: action.data.date,
        username: action.data.username,
        mostRecentOriginAmount: action.data.mostRecentOriginAmount,
        mostRecentOriginCurrency: action.data.mostRecentOriginCurrency,
        mostRecentDestinationAmount: action.data.mostRecentDestinationAmount,
        mostRecentDestinationCurrency: action.data.mostRecentDestinationCurrency
    }
    default:
      return state;
  }
}

export default order;