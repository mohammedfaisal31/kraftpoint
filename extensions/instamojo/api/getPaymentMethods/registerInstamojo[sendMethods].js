const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response) => {
  // Check if Instamojo is enabled
  const config = getConfig('system.instamojo', {});
  console.log(config)
  let status;
  if (config.status) {
    status = config.status;
  } else {
    status = await getSetting('instamojoPaymentStatus', 0);
  }
  if (parseInt(status, 10) === 1) {
    return {
      methodCode: 'instamojo',
      methodName: await getSetting('instamojoDisplayName', 'Instamojo')
    };
  } else {
    return null;
  }
};
