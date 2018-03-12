const axios = require('axios');
const { fees } = require('./constants.js');

const getExchangeRate = async (originCurrency, destinationCurrency) => {
  let rate = 1;
  if (originCurrency === destinationCurrency) {
    return rate;
  }

  const exchangeRatesByCurrency = await axios.get(`http://api.fixer.io/latest?base=${originCurrency}`);
  rate = exchangeRatesByCurrency.data.rates[destinationCurrency];

  if (rate === 'undefined') {
    console.log(`ERROR: Exchange rate missing for ${originCurrency} -> ${destinationCurrency}`)
  }
  return rate;
}

const getFee = (originAmount, originCurrency, destinationCurrency) => {
  let feePercentage = 0;
  feePercentage = fees[`${originCurrency}_${destinationCurrency}`];

  if (feePercentage === 'undefined') {
    return console.log(`ERROR: Fee % missing for ${originCurrency} -> ${destinationCurrency}`)
  }

  return originAmount * feePercentage / 100;
}

module.exports = {
  getExchangeRate,
  getFee
};