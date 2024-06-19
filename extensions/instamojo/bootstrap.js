const { Cart } = require('@evershop/evershop/src/modules/checkout/services/cart/Cart');
const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');

module.exports = () => {
  Cart.addField('payment_method', async function resolver(previousValue) {
    const paymentMethod = this.dataSource?.payment_method ?? null;
    if (paymentMethod !== 'instamojo') {
      return previousValue;
    } else {
      // Validate the payment method
      const instamojoStatus = await getSetting('instamojoPaymentStatus');
      if (parseInt(instamojoStatus, 10) !== 1) {
        return previousValue;
      } else {
        delete this.errors.payment_method;
        return paymentMethod;
      }
    }
  });


};