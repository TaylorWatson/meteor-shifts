import React, { Component } from 'react';

import { Colors } from 'material-ui/lib/styles';
// import AppBar from 'material-ui/lib/app-bar';
// import LeftNav from 'material-ui/lib/left-nav';
// import Divider from 'material-ui/lib/divider';
// import MenuItem from 'material-ui/lib/menus/menu-item';
//
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';

import title from '../reactive-vars/Title';

export default class HelpApp extends Component {

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

        { this.props.content }

      </div>
    );

  }

}
