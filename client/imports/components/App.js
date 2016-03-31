import React from 'react';

import { Colors } from 'material-ui/lib/styles';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import Divider from 'material-ui/lib/divider';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class App extends React.Component {

  constructor(p) {
    super(p);
    this.state = {
      open: false
    }
  }

  render() {

    return (
      <div>

        <LeftNav
          docked={false}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
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
