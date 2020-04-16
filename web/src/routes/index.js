import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Deliveries';
import DeliveriesForm from '~/pages/Deliveries/Form';

import Deliverymen from '~/pages/Deliverymans';
import DeliverymenForm from '~/pages/Deliverymans/Form';

import Recipients from '~/pages/Recipients';
import RecipientsForm from '~/pages/Recipients/Form';

import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" exact component={Deliveries} isPrivate />
      <Route
        path="/deliveries/form"
        exact
        component={DeliveriesForm}
        isPrivate
      />

      <Route path="/deliverymans" exact component={Deliverymen} isPrivate />
      <Route
        path="/deliverymen/form"
        exact
        component={DeliverymenForm}
        isPrivate
      />
      <Route
        path="/deliverymen/:id/form"
        exact
        component={DeliverymenForm}
        isPrivate
      />

      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route
        path="/recipients/form"
        exact
        component={RecipientsForm}
        isPrivate
      />
      <Route
        path="/recipients/:id/form"
        exact
        component={RecipientsForm}
        isPrivate
      />

      <Route path="/problems" exact component={Problems} isPrivate />
    </Switch>
  );
}
