import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Deliveries';
import DeliveriesForm from '~/pages/Deliveries/Form';

import Recipients from '~/pages/Recipients';
import Deliverymans from '~/pages/Deliverymans';
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

      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route path="/deliverymans" exact component={Deliverymans} isPrivate />
      <Route path="/problems" exact component={Problems} isPrivate />
    </Switch>
  );
}
