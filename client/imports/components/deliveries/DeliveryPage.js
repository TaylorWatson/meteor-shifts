import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';
import Paper from 'material-ui/lib/paper';
import Colors from 'material-ui/lib/styles/colors';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import KeyboardArrowLeft from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-left';
import WatchLaterIcon from 'material-ui/lib/svg-icons/action/watch-later';
import { FloatingHeader } from './floating-header.jsx';
import AppBar from 'material-ui/lib/app-bar';
import { Delivery } from '../models/deliveries';
import RaisedButton from 'material-ui/lib/raised-button';
import React, { Component } from 'react';
import _ from 'lodash';
import { DeliveryService } from '../services/delivery-service';
import { NavigationService } from '../services/navigation-service';
import { DeliveryInput } from './delivery-input.jsx';
import DeliveryOverviewSingle from './delivery-overview-single.jsx';

const DeliveriesPage = React.createClass({

  navBack() {
    NavigationService.popState();
  },

  getInitialState() {
    return {
      value: 0,
      modalVisible: false,
      deliveries: []
    }
  },

  componentDidMount(){
    this.deliveryList();
  },

  handleTabChange(value) {
    this.setState({ value: value })
  },

  deliveryList() {
    DeliveryService.deliveryList(this.props.shiftId, delivery => {
      this.setState({ deliveries: delivery })
    });
  },

  clockOut() {

  },

  openModal() {
    this.setState({ modalVisible: true });
  },

  handleClose() {
    console.log(arguments);
    this.setState({ modalVisible: false });
  },

  render() {

    const Style = {
      width: '100%',
      padding: '10px',
      backgroundColor: Colors.blueGrey50,
      height: 'calc(100vh - 64px)',
      display: 'inline-block'
    };
    const TabStyles = {
       headliine: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };

    const SaveButton = {
      width: '100%',
      height: '50px',
      backgroundColor: Colors.orange500,
    };

    const SubStyle = {
      backgroundColor: Colors.grey100,
      padding: '15px'
    };

    let modalButtons = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={ this.cancelModal } />,
      <FlatButton
        label="Take a Break"
        onTouchTap={ this.takeABreak } />,
      <FlatButton
        label="Clock Out"
        onTouchTap={ this.clockOut } />
    ];


    	let deliveryList = this.state.deliveries.map((delivery) => (
    			<DeliveryOverviewSingle
    				delivery={ delivery }
    				key={ delivery.id } />
    		));

    return(
      <div>
        <AppBar
          title="Input Deliveries"
          iconElementLeft={<IconButton onClick={ this.navBack }><KeyboardArrowLeft /></IconButton>}
          iconElementRight={<IconButton onClick={ this.openModal }><WatchLaterIcon /></IconButton>}
          style={{ backgroundColor: Colors.blueGrey900 }}
        />
          <Dialog
            contentStyle={{ width: '100%' }}
            title="Dialog With Actions"
            actions={ modalButtons }
            modal={ false }
            open={ this.state.modalVisible }
            onRequestClose={ this.handleClose }>
              What would you like to do m8?
          </Dialog>
          <Tabs
        		value={ this.state.value }
        		onChange={ this.handleChange }
            tabItemContainerStyle={{ backgroundColor: Colors.blueGrey600 }}
            inkBarStyle={{ backgroundColor: Colors.blueGrey300 }}
          >
           	<Tab label="Input Deliveries" value={0} >
                <DeliveryInput shiftId={ this.props.shiftId } />
           	</Tab>
        		<Tab label="Delivery Overview" value={1}>
         		{ deliveryList }
        		</Tab>
        	</Tabs>
      </div>
    );
  }
});