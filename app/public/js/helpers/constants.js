export const ActionTypes = {
  // UI CHANGES
  CHANGE_ORIGIN_AMOUNT: 'CHANGE_ORIGIN_AMOUNT',
  CHANGE_DESTINATION_AMOUNT: 'CHANGE_DESTINATION_AMOUNT',
  CHANGE_ORIGIN_CURRENCY: 'CHANGE_ORIGIN_CURRENCY',
  CHANGE_DESTINATION_CURRENCY: 'CHANGE_DESTINATION_CURRENCY',
  CHANGE_USERNAME: 'CHANGE_USERNAME',
  RESET_AMOUNT_STATE: 'RESET_AMOUNT_STATE',

  // AJAX Calls
  REQUEST_CONVERSION_RATE: 'REQUEST_CONVERSION_RATE',
  RECEIVED_CONVERSION_RATE_SUCCESS: 'RECEIVED_CONVERSION_RATE_SUCCESS',
  RECEIVED_CONVERSION_RATE_FAILURE: 'RECEIVED_CONVERSION_RATE_FAILURE',
  REQUEST_FEES: 'REQUEST_FEES',
  RECEIVED_FEES_SUCCESS: 'RECEIVED_FEES_SUCCESS',
  RECEIVED_AJAX_CALL_FAILURE: 'RECEIVED_AJAX_CALL_FAILURE',

  // DATABASE QUERIES
  REQUEST_ORDER_INSERT: 'REQUEST_ORDER_INSERT',
  ORDER_SUBMIT: 'ORDER_SUBMIT',
  RETREIVE_RECENT_ORDER: 'RETREIVE_RECENT_ORDER',
  GET_RECENT_ORDER: 'GET_RECENT_ORDER'
};