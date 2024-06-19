const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');

// eslint-disable-next-line no-unused-vars
const crypto = require('crypto');
const { OK } = require('@evershop/evershop/src/lib/util/httpStatus');

module.exports = async (request, response) => {
  const { instamojo_order_id, instamojo_payment_id, instamojo_signature } = request.body;
  const instamojoConfig = getConfig('system.instamojo', {});
  let secretKey;
  if (instamojoConfig.secretKey) {
    secretKey = instamojoConfig.secretKey;
  } else {
    secretKey = await getSetting('instamojoSecretKey', '');
  }

  const signature = instamojo_order_id + '|' + instamojo_payment_id;
  const expectedSignature = crypto
    .createHmac('sha1', secretKey)
    .update(signature.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === instamojo_signature;
  response.status(OK).json({ isPaymentVerified: isAuthentic });
};
