const express = require('express');
const router = express.Router();
const helpers = require('../helpers/feesAndRates.js');

router.get('/', (req, res, next) => {
  res.render('index', {});
});

router.get('/api/conversion', async (req, res, next) => {
  const originCurrency = req.query.originCurrency;
  const destCurrency = req.query.destCurrency;
  const calcOriginAmount = req.query.calcOriginAmount === 'true';
  const exchangeRate = await helpers.getExchangeRate(originCurrency, destCurrency);
  let originAmount = req.query.originAmount;
  let destAmount = req.query.destAmount;

  if (calcOriginAmount) {
    originAmount = (parseFloat(destAmount, 10) / exchangeRate).toFixed(2);
  } else {
    destAmount = (parseFloat(originAmount, 10) * exchangeRate).toFixed(2);
  }

  res.json({
    originAmount: originAmount, 
    destAmount: destAmount, 
    destCurrency: destCurrency, 
    exchangeRate: exchangeRate  
  })
});

router.get('/api/fees', (req, res, next) => {
  const originAmount = req.query.originAmount;
  const originCurrency = req.query.originCurrency;
  const destCurrency = req.query.destCurrency;
  const feeAmount = helpers.getFee(originAmount, originCurrency, destCurrency);

  res.json({
    originAmount: originAmount, 
    originCurrency: originCurrency, 
    destCurrency: destCurrency, 
    feeAmount: feeAmount  
  })
});

module.exports = {
  router
};