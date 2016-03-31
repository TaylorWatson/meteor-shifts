import App from './imports/components/AppContainer';
import Home from './imports/components/HomeContainer';
import EditShift from './imports/components/EditShiftContainer';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'react-mounter';
import Meteor from 'meteor/meteor';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

FlowRouter.route('/', {
  action() {
    mount(App, { content: <Home /> });
  }
});

FlowRouter.route('/add-shift', {
  action() {
    mount(App, { content: <EditShift /> });
  }
});