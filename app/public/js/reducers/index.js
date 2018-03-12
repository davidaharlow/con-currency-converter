import { combineReducers } from 'redux';
import amount from './amount';
import order from './order';
import error from './error';

export default combineReducers({
  amount: amount,
  order: order,
  error: error
})