const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { server } = require('../app/server/app.js');
const { client } = require('../app/database');
const { createOrder } = require('../app/database/helpers/conversionOrders.js');
require('dotenv').config();
chai.use(chaiHttp);

describe('Database', () => {
	before(() => {
  	console.log('');
  });
  after(() => {
    server.close(() => console.log(`server no longer listening on port ${process.env.PORT}`))
  });

		describe('Table: Events', () => {
		  it('should return event object for valid timeframe name in database', (done) => {
		  	client.query('SELECT id FROM concurrency_converter.users WHERE username = $1', ['David Harlow'])
		  		.then(userId => {
		  			console.log(userId)
				  	expect(userId.rows[0].id).to.be.a('number');
				  	expect(userId.rows[0].id).to.equal(1);
				  	done();
		  		});
		  }).timeout(1000);

		  it('should return nothing for invalid timeframe name not in database', (done) => {
		  	client.query('SELECT id FROM concurrency_converter.users WHERE username = $1', ['Unreal NotName'])
		  		.then(userId => {
				  	console.log(userId)
				  	expect(userId).not.to.be.a('number');
				  	done();
		  		});
		  }).timeout(1000);
	  
	});
});