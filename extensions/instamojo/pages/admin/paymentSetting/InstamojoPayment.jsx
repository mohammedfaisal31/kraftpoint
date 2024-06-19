import PropTypes from 'prop-types';
import React from 'react';
import { Field } from '@components/common/form/Field';
import { Toggle } from '@components/common/form/fields/Toggle';
import { Card } from '@components/admin/cms/Card';

export default function InstamojoPayment({
  setting: {
    instamojoPaymentStatus,
    instamojoDisplayName,
    instamojoPublishableKey,
    instamojoSecretKey,
    instamojoEndpointSecret
  }
}) {
  return (
    <Card title="Instamojo Payment">
      <Card.Session>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1 items-center flex">
            <h4>Enable?</h4>
          </div>
          <div className="col-span-2">
            <Toggle name="instamojoPaymentStatus" value={instamojoPaymentStatus} />
          </div>
        </div>
      </Card.Session>
      <Card.Session>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1 items-center flex">
            <h4>Display Name</h4>
          </div>
          <div className="col-span-2">
            <Field
              type="text"
              name="instamojoDisplayName"
              placeholder="Display Name"
              value={instamojoDisplayName}
            />
          </div>
        </div>
      </Card.Session>
      <Card.Session>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1 items-center flex">
            <h4>Publishable Key</h4>
          </div>
          <div className="col-span-2">
            <Field
              type="text"
              name="instamojoPublishableKey"
              placeholder="Publishable Key"
              value={instamojoPublishableKey}
            />
          </div>
        </div>
      </Card.Session>
      <Card.Session>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1 items-center flex">
            <h4>Secret Key</h4>
          </div>
          <div className="col-span-2">
            <Field
              type="text"
              name="instamojoSecretKey"
              placeholder="Secret Key"
              value={instamojoSecretKey}
            />
          </div>
        </div>
      </Card.Session>
      <Card.Session>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1 items-center flex">
            <h4>Webhook Secret Key</h4>
          </div>
          <div className="col-span-2">
            <Field
              type="text"
              name="instamojoEndpointSecret"
              placeholder="Secret Key"
              value={instamojoEndpointSecret}
            />
          </div>
        </div>
      </Card.Session>
    </Card>
  );
}

InstamojoPayment.propTypes = {
  setting: PropTypes.shape({
    instamojoPaymentStatus: PropTypes.bool,
    instamojoDisplayName: PropTypes.string,
    instamojoPublishableKey: PropTypes.string,
    instamojoSecretKey: PropTypes.string,
    instamojoEndpointSecret: PropTypes.string
  }).isRequired
};

export const layout = {
  areaId: 'paymentSetting',
  sortOrder: 20
};

export const query = `
  query Query {
    setting {
      instamojoDisplayName
      instamojoPaymentStatus
      instamojoPublishableKey
      instamojoSecretKey
      instamojoEndpointSecret
    }
  }
`;
