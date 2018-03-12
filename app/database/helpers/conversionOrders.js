const { client } = require('../');
require('dotenv').config();

const createOrder = (username, password, originCurrency, destinationCurrency, , exchangeRate, originAmoung, destinationAmount, date) =>
  client
    .query('SELECT FROM WHERE = $1', [])
    .then(data =>
      client.query(
        'INSERT INTO orders () VALUES ($1, $2, $3, $4) RETURNING *',
        [],
      ));

const getOrdersByDate = date =>
  client
    .query('SELECT * FROM orders WHERE date = $1', [date])
    .then(data => data.rows);

const getOrdersByUser = user =>
  client
    .query('SELECT * FROM orders WHERE user_id = $1', [user])
    .then(data => data.rows);

module.exports = {
	createOrder,
	getOrdersByDate,
	getOrdersByUser
}