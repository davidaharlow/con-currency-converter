import axios from 'axios';
import debounce from 'lodash.debounce';
import { ActionTypes as types } from '../helpers/constants';
import { getErrorMsg } from '../helpers/actionHelpers';


export const changeOriginAmount = (newAmount) => {
  return {
    type:types.CHANGE_ORIGIN_AMOUNT,
    data:{newAmount: newAmount}
  }
}

export const changeDestAmount = (newAmount) => {
  return {
    type:types.CHANGE_DESTINATION_AMOUNT,
    data:{newAmount: newAmount}
  }
}

export const changeOriginCurrency = (newCurrency) => {
  return {
    type:types.CHANGE_ORIGIN_CURRENCY,
    data:{newCurrency: newCurrency}
  }
}

export const changeDestCurrency = (newCurrency) => {
  return {
    type:types.CHANGE_DESTINATION_CURRENCY,
    data:{newCurrency: newCurrency}
  }
}

export const usernameChange = (usernameObj) => {
  return {
    type:types.CHANGE_USERNAME,
    data:{username: usernameObj.username}
  }
}

export const orderSubmit = (payload) => {
  return (dispatch) => {
    makeOrderEntry(payload, dispatch)
  }
}

const makeOrderEntry = (payload, dispatch) => {
  dispatch({type:types.REQUEST_ORDER_INSERT, data: payload});

  axios.get(`/userIdByUsername/${payload.username}`)
  .then((userId) => {
    payload.userId = userId.data.userId;
    axios({
      method: 'post',
      url: '/createOrder',
      headers: {"Content-Type": "application/json"},
      data: JSON.stringify(payload)
    })
    .then((insertedOrder) => {
      console.log('Order saved to database', insertedOrder)
      dispatch({type:types.ORDER_SUBMIT, 
        data: {
          mostRecentOriginAmount: insertedOrder.data.rows[0].origin_amount,
          mostRecentOriginCurrency: insertedOrder.data.rows[0].orign_currency,
          mostRecentDestinationAmount: insertedOrder.data.rows[0].destination_amount,
          mostRecentDestinationCurrency: insertedOrder.data.rows[0].destination_currency,
          date: insertedOrder.data.rows[0].date
        }
      });
    });
  })
  .catch((err) => {
    console.log('Order failed to save to database', payload)
    dispatch({type:types.RECEIVED_CONVERSION_RATE_FAILURE, data: err});
  })
}

export const fetchConversionRate = (payload) => {
  return (dispatch) => {
    makeConversionAjaxCall(payload, dispatch);
  }
}

const _makeConversionAjaxCall = (payload, dispatch) => {
  dispatch({type:types.REQUEST_CONVERSION_RATE, data: payload});

  axios.get('/api/conversion', {
      params: payload
  })
  .then((resp) => {
    dispatch({type:types.RECEIVED_CONVERSION_RATE_SUCCESS, data: resp.data});
  })
  .catch((err) => {
    dispatch({type:types.RECEIVED_CONVERSION_RATE_FAILURE, data: err});
  });
}
const makeConversionAjaxCall = debounce(_makeConversionAjaxCall, 300);

export const initOrderInfo = (payload) => {
  return (dispatch) => {
    retrieveOrderFromDatabase(payload, dispatch);
  }
}

const retrieveOrderFromDatabase = (userId, dispatch) => {
  dispatch({type:types.GET_RECENT_ORDER, data: userId});
  axios.get(`usernameByUserId/${userId}`)
  .then((username) => {

    axios.get(`getLastestOrder/${userId}`)
    .then((resp) => {
      console.log('resp.', resp.data.userId[0])
      dispatch({type:types.RETREIVE_RECENT_ORDER, 
        data: {
          mostRecentOriginAmount: resp.data.userId[0].origin_amount,
          mostRecentOriginCurrency: resp.data.userId[0].orign_currency,
          mostRecentDestinationAmount: resp.data.userId[0].destination_amount,
          mostRecentDestinationCurrency: resp.data.userId[0].destination_currency,
          date: resp.data.userId[0].date,
          username: username.data.username
        }
      });
    });
  })
  .catch((err) => {
    dispatch({type:types.RECEIVED_CONVERSION_RATE_FAILURE, data: err});
  });
}

export const fetchConversionRateAndFees = (payload) => {
  return (dispatch) => {
    makeConversionAndFeesAjaxCalls(payload, dispatch);
  }
}

const _makeConversionAndFeesAjaxCalls = (payload, dispatch) => {
  dispatch({type:types.REQUEST_CONVERSION_RATE, data: payload});

  axios.get('/api/conversion', {
    params: payload
  })
  .then((resp) => {
    dispatch({type:types.RECEIVED_CONVERSION_RATE_SUCCESS, data: resp.data});

    const feePayload = Object.assign({}, payload, {originAmount: resp.data.originAmount});
    dispatch(fetchFees(feePayload));
  })
  .catch((err) => {
    dispatch({type:types.RECEIVED_CONVERSION_RATE_FAILURE, data: err});
  });
}
const makeConversionAndFeesAjaxCalls = debounce(_makeConversionAndFeesAjaxCalls, 300);

export const fetchFees = (payload) => {
  return (dispatch) => {
    makeFeeAjaxCall(payload, dispatch);
  }
}

const _makeFeeAjaxCall = (payload, dispatch) => {
  dispatch({type:types.REQUEST_FEES, data: payload});

  axios.get('/api/fees', {
    params: payload
  })
  .then((resp) => {
    dispatch({type:types.RECEIVED_FEES_SUCCESS, });
  })
  .catch((resp) => {
    const msg = getErrorMsg(resp);
    dispatch({type:types.RECEIVED_AJAX_CALL_FAILURE, data: {msg: msg, failedCall: 'fees'}});

  });
}
const makeFeeAjaxCall = debounce(_makeFeeAjaxCall, 300);

