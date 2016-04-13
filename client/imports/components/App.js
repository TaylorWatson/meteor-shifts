import React, { Component } from 'react';

import { Colors } from 'material-ui/lib/styles';
// import AppBar from 'material-ui/lib/app-bar';
// import LeftNav from 'material-ui/lib/left-nav';
// import Divider from 'material-ui/lib/divider';
// import MenuItem from 'material-ui/lib/menus/menu-item';
//
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';

import title from '../reactive-vars/Title';

export default class App extends Component {

  constructor(p) {
    super(p);
  }

  componentDidMount() {
    $(this.refs.newTest).sideNav({
      closeOnClick: true
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      this.refs.sideNav.toggle();
    }
  }

  render() {

    iconStyle = {
      transform: 'scale(2.2, 1.5)',
      marginTop: '17px'
    }

    return (
      <div>
        <div className='navbar-fixed'>
        <nav className="blue-grey darken-4">
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">{ this.props.title }</a>
            <a href="/" data-activates="mobile-demo" ref="newTest" style={{ marginLeft: '19px' }} className="button-collapse waves-effect default"><MenuIcon color={ "white" } style={ iconStyle } /></a>
            <a href="/shifts" className="right waves-effect default" style={{ marginRight: '15px' }} >Add Shift</a>
            <ul className="right hide-on-med-and-down">
              <li><a href="/reports">Reporting</a></li>
              <li><a href="#">Set metrics</a></li>
              <li><a href="#">Help and feedback</a></li>
              <li><a href="#">Rate the app</a></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li><a href="/">Home</a></li>
              <li><a href="/reports">Reporting</a></li>
              <li><a href="/settings">Set metrics</a></li>
              <li><a href="/help">Help</a></li>
              <li><a href="/reset">DEBUG: Reset Database</a></li>
            </ul>
          </div>
        </nav>
        </div>
        { this.props.content }

      </div>
    );

  }

}
