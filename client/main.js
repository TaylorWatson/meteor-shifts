import App from './imports/components/AppContainer';
import Home from './imports/components/HomeContainer';
import EditShift from './imports/components/EditShiftContainer';
import DeliverySingle from './imports/components/deliveries/DeliverySingle';
// import DeliveryPage from './imports/components/deliveries/DeliveryPage';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'react-mounter';
import Meteor from 'meteor/meteor';
import Title from './imports/reactive-vars/Title';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

FlowRouter.route('/', {
  action() {
    Title.set('Upcoming Shifts');
    mount(App, { content: <Home /> });
  }
});

FlowRouter.route('/shifts', {
  action() {
    Title.set('Add New Shift');
    mount(App, { content: <EditShift isNew={ true } /> });
  }
});

FlowRouter.route('/shifts/:shiftId', {
  action(params) {
    Title.set('Edit Shift');
    mount(App, { content: <EditShift shiftId={ params.shiftId } /> });
  }
});

FlowRouter.route('/deliveries', {
  action(params) {
    Title.set('Edit Shift');
    mount(App, { content: <DeliverySingle  /> });
  }
});
