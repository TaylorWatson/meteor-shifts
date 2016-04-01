import React from 'react';

import { Colors } from 'material-ui/lib/styles';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import Divider from 'material-ui/lib/divider';
import MenuItem from 'material-ui/lib/menus/menu-item';

import LeftNavOpen from '../reactive-vars/LeftNavOpen';

export default class App extends React.Component {

  constructor(p) {
    super(p);
  }

  render() {

    return (
      <div>

        <LeftNav
          docked={ false }
          open={ this.props.open }
          onRequestChange={ req => LeftNavOpen.set(req) }
          style={{ backgroundColor: Colors.grey200 }}>
          <AppBar style={{ backgroundColor: Colors.blueGrey900 }} showMenuIconButton={ false } title="Shifts Tip Tracker" />
          <MenuItem onTouchTap={this.handleClose}>Reports</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Settings</MenuItem>
          <Divider />
          <MenuItem onTouchTap={this.handleClose}>About Us</MenuItem>
        </LeftNav>

        { this.props.content }

      </div>
    );

  }

}
