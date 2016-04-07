import App from './imports/components/AppContainer';
import Home from './imports/components/HomeContainer';
import Reports from './imports/components/Reports';
import EditShift from './imports/components/EditShift';
import DeliverySingle from './imports/components/deliveries/DeliverySingle';
import DeliveryPage from './imports/components/deliveries/DeliveryPage';
import Settings from './imports/components/Settings';
import { DatabaseService } from './imports/services/DatabaseService';
import Title from './imports/reactive-vars/Title';

import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'react-mounter';

import { Meteor } from 'meteor/meteor';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

Meteor.startup(() => {
  DatabaseService.init();
});

FlowRouter.route('/', {
  action() {
    Title.set("Upcoming Shifts");
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

FlowRouter.route('/deliveries/:shiftId', {
  action(params) {
    Title.set('Deliveries');
    mount(App, { content: <DeliveryPage shiftId={ params.shiftId } /> });
  }
});

FlowRouter.route('/settings', {
  action(params) {
    Title.set('App Settings');
    mount(App, { content: <Settings /> });
  }
});

FlowRouter.route('/reports', {
  action(params) {
    Title.set('Generate Reports');
    mount(App, { content: <Reports /> });
  }
})


//whyyyyyy