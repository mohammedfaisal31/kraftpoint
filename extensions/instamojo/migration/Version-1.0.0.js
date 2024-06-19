const { execute } = require('@evershop/postgres-query-builder');

// eslint-disable-next-line no-multi-assign
module.exports = exports = async (connection) => {
  await execute(connection, `CREATE TABLE instamojo_payment_transaction_mapping (
  id serial PRIMARY KEY,
  instamojo_order_id VARCHAR ( 50 ) NOT NULL
  )`);
};
