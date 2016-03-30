import App from './imports/components/AppContainer';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'react-mounter';
import Meteor from 'meteor/meteor';

FlowRouter.route('/', {
  action(params, queryParams) {
    mount(App);
  }
});