const cron = require('node-cron');
const axios = require('axios');
const db = require('../../database/index.js');
const { currencies } = require('../helpers/constants.js');

const updateExchangeRates = async (currency) => {
	const exchangeRatesByCurrency = await axios(`http://api.fixer.io/latest?base=${currency}`);
	// db.insert
};

// const recurringExchangeRate = cron.schedule('5 * * * * *', () => {
//   updateExchangeRates();
// }, false);

// recurringStatUpdate.start();

