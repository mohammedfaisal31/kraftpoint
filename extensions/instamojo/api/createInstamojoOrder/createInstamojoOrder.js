const { select } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');
const Instamojo = require('instamojo-nodejs');

module.exports = async (request, response, stack, next) => {
  const { body } = request;
  console.log("Create Intent reached", body)
  const order = await select()
    .from('order')
    .where('uuid', '=', body.orderId)
    .load(pool);

  if (!order) {
    response.json({
      success: false,
      message: "The requested order does not exist"
    });
  } else {
    const instamojoConfig = getConfig('system.instamojo', {});
    let instamojoApiKey, instamojoAuthToken;
    if (instamojoConfig.apiKey) {
      instamojoApiKey = instamojoConfig.apiKey;
    } else {
      instamojoApiKey = await getSetting('instamojoApiKey', '');
    }

    if (instamojoConfig.authToken) {
      instamojoAuthToken = instamojoConfig.authToken;
    } else {
      instamojoAuthToken = await getSetting('instamojoAuthToken', '');
    }

    Instamojo.setKeys(instamojoApiKey, instamojoAuthToken);

    const paymentData = new Instamojo.PaymentData();
    paymentData.purpose = `Order ${body.orderId}`;
    paymentData.amount = order.grand_total;
    paymentData.redirect_url = `${process.env.BASE_URL}/checkout/success`;
    paymentData.send_email = true;
    paymentData.email = order.customerEmail;

    Instamojo.createPayment(paymentData, function (error, response) {
      if (error) {
        response.json({
          success: false,
          message: error.message
        });
      } else {
        response.json({
          paymentUrl: response.payment_request.longurl,
          success: true
        });
      }
    });
  }
};
