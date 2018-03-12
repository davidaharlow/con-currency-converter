const { server } = require('../app/server/app.js');
const { getExchangeRate } = require('../app/server/helpers/feesAndRates.js');
const { getFee } = require('../app/server/helpers/feesAndRates.js');
const chai = require('chai');
const expect = chai.expect;

describe('Functions', () => {

	before(() => {
  	console.log('');
  });
  after(() => {
    server.close(() => console.log(`server no longer listening on port ${process.env.PORT}`))
  });

	describe('getExchangeRate', () => {
	  it('gets a valid exchange rate', async () => {
			const rate = await getExchangeRate('USD', 'EUR');
			expect(rate).to.be.a('number');
		});
	});	

	describe('getFee', () => {
  	it('gets a valid fee', () => {
			const fee = getFee(1000, 'USD', 'EUR')
			expect(fee).to.be.a('number');
		});
	});	

});