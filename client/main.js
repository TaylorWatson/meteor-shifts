import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('app-content'));
})