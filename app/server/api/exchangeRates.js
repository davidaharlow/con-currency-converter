const cron = require('node-cron');
const axios = require('axios');
const db = require('../../database/index.js');
const { currencies } = require('../helpers/constants.js');

// To Do: Create tables for storing historical exchange rate info  
// To Do: Create Cron Job to get the exchange rates for each currency and store to database
const updateExchangeRates = async (currency) => {
	const exchangeRatesByCurrency = await axios(`http://api.fixer.io/latest?base=${currency}`);
	// db.insert function
};

// To Do: Once ready, set this to happen once per day at 8am
const recurringExchangeRate = cron.schedule('5 * * * * *', () => {
	const currencyCodes = currencies.map(currency => currency.code);

	currencyCodes.forEach((currency) => {
  	updateExchangeRates(currency);
  });
  
}, false);

// uncomment to begin cron job
// recurringStatUpdate.start();