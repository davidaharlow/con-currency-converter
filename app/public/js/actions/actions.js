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
    dispatch({type:types.RECEIVED_FEES_SUCCESS, data: resp.data});
  })
  .catch((resp) => {
    const msg = getErrorMsg(resp);
    dispatch({type:types.RECEIVED_AJAX_CALL_FAILURE, data: {msg: msg, failedCall: 'fees'}});

  });
}
const makeFeeAjaxCall = debounce(_makeFeeAjaxCall, 300);

