const currencies = [
  {code: "AUD", feeMultiplier: 2},
  {code: "BGN", feeMultiplier: 2}, 
  {code: "BRL", feeMultiplier: 3}, 
  {code: "CAD", feeMultiplier: 2}, 
  {code: "CHF", feeMultiplier: 3}, 
  {code: "CNY", feeMultiplier: 3}, 
  {code: "CZK", feeMultiplier: 3}, 
  {code: "DKK", feeMultiplier: 2}, 
  {code: "EUR", feeMultiplier: 2}, 
  {code: "GBP", feeMultiplier: 2}, 
  {code: "HKD", feeMultiplier: 3}, 
  {code: "HRK", feeMultiplier: 4}, 
  {code: "HUF", feeMultiplier: 3}, 
  {code: "IDR", feeMultiplier: 6}, 
  {code: "ILS", feeMultiplier: 6}, 
  {code: "INR", feeMultiplier: 5}, 
  {code: "ISK", feeMultiplier: 3}, 
  {code: "JPY", feeMultiplier: 3}, 
  {code: "KRW", feeMultiplier: 2}, 
  {code: "MXN", feeMultiplier: 4}, 
  {code: "MYR", feeMultiplier: 6}, 
  {code: "NOK", feeMultiplier: 3}, 
  {code: "NYD", feeMultiplier: 3}, 
  {code: "PHP", feeMultiplier: 5}, 
  {code: "PLN", feeMultiplier: 4}, 
  {code: "RON", feeMultiplier: 4}, 
  {code: "RUB", feeMultiplier: 4}, 
  {code: "SEK", feeMultiplier: 4}, 
  {code: "SGD", feeMultiplier: 3}, 
  {code: "THB", feeMultiplier: 4}, 
  {code: "TRY", feeMultiplier: 4},
  {code: "USD", feeMultiplier: 2},
  {code: "ZAR", feeMultiplier: 4}
];

const makeCurrencyFeesObj = function(currencies) {
  const currencyCodes = currencies.map(currency => currency.code);

  let currencyFees = {};
  currencies.forEach(currency => {
    currencyFees[currency.code] = currency.feeMultiplier;
  });

  let fees = {};
  currencyCodes.forEach((fromCurrency) => {
    currencyCodes.forEach((toCurrency) => {
      if (fromCurrency === toCurrency) {
        fees[`${fromCurrency}_${toCurrency}`] = 0;
      } else {
        fees[`${fromCurrency}_${toCurrency}`] = currencyFees[fromCurrency] * currencyFees[toCurrency];
      }
    });
  });

  return fees
};

const fees = makeCurrencyFeesObj(currencies);

module.exports = {
  currencies,
	fees
}