import { ActionTypes as types } from '../helpers/constants';

const defaultState = {
  originAmount: '0.00',
  destinationAmount: '0.00',
  originCurrency: 'USD',
  destinationCurrency: 'USD',
  conversionRate: 1.0,
  feeAmount: 0.00,
  totalCost: 0.00
};

const amount = (state = defaultState, action) => {
  switch (action.type) {
    case (types.CHANGE_ORIGIN_AMOUNT):
      return {
        ...state,
        originAmount: action.data.newAmount
     }
    case (types.CHANGE_DESTINATION_AMOUNT):
      return {
        ...state,
        destinationAmount: action.data.newAmount
     }
    case (types.CHANGE_ORIGIN_CURRENCY):
      return {
        ...state,
        originCurrency: action.data.newCurrency
      }
    case (types.CHANGE_DESTINATION_CURRENCY):
      return {
        ...state,
        destinationCurrency: action.data.newCurrency
      }
    case (types.RECEIVED_CONVERSION_RATE_SUCCESS):
      return {
        ...state,
        conversionRate: action.data.exchangeRate,
        originAmount: action.data.originAmount,
        destinationAmount: action.data.destAmount
      }
    case (types.RECEIVED_FEES_SUCCESS):
      const newFeeAmount = action.data.feeAmount;
      const newTotal = parseFloat(state.originAmount, 10) + parseFloat(newFeeAmount, 10);

      return {
        ...state,
        feeAmount: newFeeAmount,
        totalCost: newTotal
      }
    default:
      return state;
  }
}

export default amount;