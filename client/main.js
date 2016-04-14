import App from './imports/components/AppContainer';
import Home from './imports/components/HomeContainer';
import Reports from './imports/components/Reports';
import Help from './imports/components/Help';
import HelpAdd from './imports/components/help/HelpAdd';
import HelpClock from './imports/components/help/HelpClock';
import HelpDelivery from './imports/components/help/HelpDelivery';
import HelpSummary from './imports/components/help/HelpSummary';
import HelpGenerate from './imports/components/help/HelpGenerate';
import EditShift from './imports/components/EditShift';
import DeliverySingle from './imports/components/deliveries/DeliverySingle';
import DeliveryPage from './imports/components/deliveries/DeliveryPage';
import ShiftOverview from './imports/components/ShiftOverview';
import Settings from './imports/components/Settings';
import { DatabaseService } from './imports/services/DatabaseService';
import Title from './imports/reactive-vars/Title';


import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'react-mounter';

import { Meteor } from 'meteor/meteor';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import FastClick from 'fastclick';

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

FlowRouter.route('/deliveries/:shiftId/summary', {
  action(params) {
    Title.set('Close Shift');
    mount(App, { content: <ShiftOverview shiftId={ params.shiftId } /> });
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
});

FlowRouter.route('/help', {
  action() {
    mount(App, { content: <Help /> });
  }
});

FlowRouter.route('/reset', {
  action() {
    if (DatabaseService.db) {
      DatabaseService.refresh();
    }
    FlowRouter.go('/help');
  }
});

FlowRouter.route('/help/add', {
  action() {
    mount(App, { content: <HelpAdd /> });
  }
});

FlowRouter.route('/help/clock', {
  action() {
    mount(App, { content: <HelpClock /> });
  }
});

FlowRouter.route('/help/add-delivery', {
  action() {
    mount(App, { content: <HelpDelivery /> });
  }
});

FlowRouter.route('/help/view-sum', {
  action() {
    mount(App, { content: <HelpSummary /> });
  }
});

FlowRouter.route('/help/generate', {
  action() {
    mount(App, { content: <HelpGenerate /> });
  }
});
