// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const { expect } = require('chai');
// const server = require('../app/server/app.js');
// const { client } = require('../app/database');
// const { createOrder } = require('../app/database/helpers.conversionOrders.js');
// require('dotenv').config();
// chai.use(chaiHttp);


// describe('Database', () => {
// 	before(() => {
//   	console.log('');
//   });
//   after(() => {
//     server.close(() => console.log(`server no longer listening on port ${process.env.PORT}`))
//   });

// 	describe('Table: Events', () => {
// 	  it('should return event object for valid timeframe name in database', async (done) => {
// 	    const query = createOrder('playlistServedEvent', message);
// 	    client.execute(query.query, query.params)
// 	      .then(result => console.log('User with email %s', result.rows[0].email));

// 	    setTimeout(() => {
// 	      const queryResult = {};
// 	      queryResult.id = 10000000;
// 	      expect(queryResult.id).to.be(10000000);
// 	    }, 500);
// 	  }).timeout(1000);

// 	  it('should return nothing for invalid timeframe name not in database', (done) => {

// 	  }).timeout(1000);
  
// });