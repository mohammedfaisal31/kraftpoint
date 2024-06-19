const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');

module.exports = {
  Setting: {
    instamojoPaymentStatus: (setting) => {
      const instamojoConfig = getConfig('system.instamojo', {});
      if (instamojoConfig.status) {
        return instamojoConfig.status;
      }
      const instamojoPaymentStatus = setting.find(
        (s) => s.name === 'instamojoPaymentStatus'
      );
      if (instamojoPaymentStatus) {
        return parseInt(instamojoPaymentStatus.value, 10);
      } else {
        return 0;
      }
    },
    instamojoDislayName: (setting) => {
      const instamojoDislayName = setting.find(
        (s) => s.name === 'instamojoDislayName'
      );
      if (instamojoDislayName) {
        return instamojoDislayName.value;
      } else {
        return 'Credit Card';
      }
    },
    instamojoPublishableKey: (setting) => {
      const instamojoConfig = getConfig('system.instamojo', {});
      if (instamojoConfig.publishableKey) {
        return instamojoConfig.publishableKey;
      }
      const instamojoPublishableKey = setting.find(
        (s) => s.name === 'instamojoPublishableKey'
      );
      if (instamojoPublishableKey) {
        return instamojoPublishableKey.value;
      } else {
        return null;
      }
    },
    instamojoSecretKey: (setting, _, { userTokenPayload }) => {
      const instamojoConfig = getConfig('system.instamojo', {});
      if (instamojoConfig.secretKey) {
        return '*******************************';
      }
      if (userTokenPayload && userTokenPayload?.user?.uuid) {
        const instamojoSecretKey = setting.find(
          (s) => s.name === 'instamojoSecretKey'
        );
        if (instamojoSecretKey) {
          return instamojoSecretKey.value;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    instamojoEndpointSecret: (setting, _, { userTokenPayload }) => {
      const instamojoConfig = getConfig('system.instamojo', {});
      if (instamojoConfig.endpointSecret) {
        return '*******************************';
      }
      if (userTokenPayload && userTokenPayload?.user?.uuid) {
        const instamojoEndpointSecret = setting.find(
          (s) => s.name === 'instamojoEndpointSecret'
        );
        if (instamojoEndpointSecret) {
          return instamojoEndpointSecret.value;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  }
};