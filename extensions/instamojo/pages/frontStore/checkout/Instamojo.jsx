import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useCheckout } from '@components/common/context/checkout';
import { useQuery } from 'urql';
import InstamojoLogo from './InstamojoLogo';

const cartQuery = `
  query Query($cartId: String) {
    cart(id: $cartId) {
      billingAddress {
        cartAddressId
        fullName
        postcode
        telephone
        country {
          name
          code
        }
        province {
          name
          code
        }
        city
        address1
        address2
      }
      shippingAddress {
        cartAddressId
        fullName
        postcode
        telephone
        country {
          name
          code
        }
        province {
          name
          code
        }
        city
        address1
        address2
      }
      customerEmail
    }
  }
`;
function InstamojoApp({ orderId, orderPlaced, cartId, checkoutSuccessUrl }) {
  const [instamojoOrderId, setInstamojoOrderId] = useState('');
  const [result] = useQuery({
    query: cartQuery,
    variables: {
      cartId
    },
    pause: orderPlaced === true
  });
  useEffect(() => {
    // Create PaymentIntent as soon as the order is placed
    if (orderId && orderPlaced) {
      window
        .fetch('/api/instamojo/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ order_id: orderId })
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setInstamojoOrderId(data.id);
          handlePayment(result, data.amount, data.id, data.key);
        });
    }
  }, [orderId]);

  const handlePayment = (result, amount, instamojoOrderId, instamojoKey) => {
    console.log("Clicked On Payment")
  };
  return (
    <div className="p-2 text-center border rounded mt-1 border-divider">
      You can Pay via UPI, Credit/Debit Card, and Net Banking
    </div>
  );
}

InstamojoApp.propTypes = {
  orderId: PropTypes.string.isRequired,
  orderPlaced: PropTypes.bool.isRequired
};

export default function InstamojoMethod({ setting }) {
  // Get the selected payment
  const {
    paymentMethods,
    setPaymentMethods,
    checkoutSuccessUrl,
    orderPlaced,
    orderId,
    cartId
  } = useCheckout();
  const selectedPaymentMethod = paymentMethods
    ? paymentMethods.find((paymentMethod) => paymentMethod.selected)
    : undefined;

  return (
    <div>
      <div className="flex justify-start items-center gap-1">
        {(!selectedPaymentMethod ||
          selectedPaymentMethod.code !== 'instamojo') && (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPaymentMethods((previous) =>
                previous.map((paymentMethod) => {
                  if (paymentMethod.code === 'instamojo') {
                    return {
                      ...paymentMethod,
                      selected: true
                    };
                  } else {
                    return {
                      ...paymentMethod,
                      selected: false
                    };
                  }
                })
              );
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
          </a>
        )}
        {selectedPaymentMethod && selectedPaymentMethod.code === 'instamojo' && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2c6ecb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        )}
        <div><InstamojoLogo width={70} /></div>
      </div>
      <div>
        {selectedPaymentMethod && selectedPaymentMethod.code === 'instamojo' && (
          <div>
            <InstamojoApp
              orderPlaced={orderPlaced}
              orderId={orderId}
              cartId={cartId}
              checkoutSuccessUrl={checkoutSuccessUrl}
            />
          </div>
        )}
      </div>
    </div>
  );
}

InstamojoMethod.propTypes = {
  setting: PropTypes.shape({
    instamojoPublishableKey: PropTypes.string.isRequired
  }).isRequired
};

export const layout = {
  areaId: 'checkoutPaymentMethodinstamojo',
  sortOrder: 20
};


