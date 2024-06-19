/* eslint-disable global-require */
const {
  insert,
  update,
  commit,
  rollback,
  select,
  startTransaction
} = require('@evershop/postgres-query-builder');
const {
  getConnection, pool
} = require('@evershop/evershop/src/lib/postgres/connection');
const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');
const crypto = require('crypto');
const { OK, INTERNAL_SERVER_ERROR } = require('@evershop/evershop/src/lib/util/httpStatus');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, stack, next) => {

  let connection;
  try {
    connection = await getConnection();

    if (true) {
      const body = JSON.parse(request.body.toString());
      await startTransaction(connection);
      const order = await select()
        .from('order')
        .where('instamojo_order_id', '=', body.payment_request_id)
        .load(connection);
      switch (body.status) {
        case 'credit': {
          await update('payment_transaction')
            .given({ payment_action: 'Capture' })
            .where('transaction_id', '=', body.payment.payment_id)
            .execute(connection);

          await update('order')
            .given({ payment_status: 'paid' })
            .where('order_id', '=', order.order_id)
            .execute(connection);

          await insert('order_activity')
            .given({
              order_activity_order_id: order.order_id,
              comment: `Customer paid by using ${body.payment.payment_method}`,
              customer_notified: 0
            })
            .execute(connection);
          break;
        }
        case 'payment_failed': {
          await insert('payment_transaction')
            .given({
              amount: body.payment.amount,
              payment_transaction_order_id: order.order_id,
              transaction_id: body.payment.payment_id,
              transaction_type: body.payment.payment_method,
              payment_action: 'Failed'
            })
            .execute(connection);
          break;
        }
        default: {
          // eslint-disable-next-line no-console
          console.log(`Unhandled event type ${body.event}`);
        }
      }
    } else {
      response.status(INTERNAL_SERVER_ERROR).send('Invalid signature');
      return;
    }

    await commit(connection);
    response.status(OK).json({ message: "OK" });
  } catch (err) {
    if (connection) {
      await rollback(connection);
    }
    response.status(INTERNAL_SERVER_ERROR).send('Something went wrong');
  }
};
