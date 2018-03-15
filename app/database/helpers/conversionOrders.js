const { client } = require('../');
require('dotenv').config();

const createOrder = (order) =>
  client
    .query(
      'INSERT INTO concurrency_converter.orders (user_id, orign_currency, destination_currency, origin_amount, destination_amount, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [order.userId, order.originCurrency, order.destinationCurrency, order.originAmount, order.destinationAmount, order.date],
    );

const selectUserId = (username) => {
  return client
    .query('SELECT id FROM concurrency_converter.users WHERE username = $1', [username])
    .then(data => {
      if (data.rows.length !== 0) {
        return data.rows[0].id;
      } else {
        return client.query('INSERT INTO concurrency_converter.users (username) VALUES ($1) RETURNING id', [username])
          .then(data => {
            return data.rows[0].id;
          });
      }   
    });
}

const selectUsernameById = (userId) => {
  return client
    .query('SELECT username FROM concurrency_converter.users WHERE id = $1', [userId])
    .then(data => {

      if (data.rows.length !== 0) {
        return data.rows[0].username;
      } 
    });
}

const getOrdersByDate = date =>
  client
    .query('SELECT * FROM concurrency_converter.orders WHERE date = $1', [date])
    .then(data => data.rows);

const getMostRecentOrderByUser = user =>
  client
    .query('SELECT * FROM concurrency_converter.orders WHERE user_id = $1 ORDER BY id DESC LIMIT 1', [user])
    .then(data => data.rows);

module.exports = {
	createOrder,
	getOrdersByDate,
	getMostRecentOrderByUser,
  selectUserId,
  selectUsernameById
}

