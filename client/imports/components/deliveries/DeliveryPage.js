import React, { Component } from 'react';
import _ from 'lodash';

// import TextField from 'material-ui/lib/text-field';
// import Toggle from 'material-ui/lib/toggle';
// import Paper from 'material-ui/lib/paper';
// import Colors from 'material-ui/lib/styles/colors';
// import SelectField from 'material-ui/lib/select-field';
// import MenuItem from 'material-ui/lib/menus/menu-item';
// import IconButton from 'material-ui/lib/icon-button';
// import Tabs from 'material-ui/lib/tabs/tabs';
// import Tab from 'material-ui/lib/tabs/tab';
// import RaisedButton from 'material-ui/lib/raised-button';
// import Dialog from 'material-ui/lib/dialog';
// import FlatButton from 'material-ui/lib/flat-button';
// import KeyboardArrowLeft from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-left';
// import WatchLaterIcon from 'material-ui/lib/svg-icons/action/watch-later';
// import { FloatingHeader } from './floating-header.jsx';
// import AppBar from 'material-ui/lib/app-bar';

import DeliveryInput from './DeliveryInput';
import DeliverySingle from './DeliverySingle';

import { Delivery } from '../models/deliveries';
import { DeliveryService } from '../services/delivery-service';
import { NavigationService } from '../services/navigation-service';


    // const Style = {
    //   width: '100%',
    //   padding: '10px',
    //   backgroundColor: Colors.blueGrey50,
    //   height: 'calc(100vh - 64px)',
    //   display: 'inline-block'
    // };
    // const TabStyles = {
    //    headliine: {
    //     fontSize: 24,
    //     paddingTop: 16,
    //     marginBottom: 12,
    //     fontWeight: 400,
    //   },
    // };

    // const SaveButton = {
    //   width: '100%',
    //   height: '50px',
    //   backgroundColor: Colors.orange500,
    // };

    // const SubStyle = {
    //   backgroundColor: Colors.grey100,
    //   padding: '15px'
    // };




export default class DeliveryPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      modalVisible: false,
      deliveries: []
    }
  }

  navBack() {
    window.history.back();
  }

  componentDidMount(){
    this.deliveryList();
  }

  handleTabChange(value) {
    this.setState({ value: value })
  }

  deliveryList() {
    DeliveryService.deliveryList(this.props.shiftId, delivery => {
      this.setState({ deliveries: delivery })
    });
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  handleClose() {
    console.log(arguments);
    this.setState({ modalVisible: false });
  }

  render() {

    // let modalButtons = [
    //   <FlatButton
    //     label="Cancel"
    //     secondary={true}
    //     onTouchTap={ this.cancelModal } />,
    //   <FlatButton
    //     label="Take a Break"
    //     onTouchTap={ this.takeABreak } />,
    //   <FlatButton
    //     label="Clock Out"
    //     onTouchTap={ this.clockOut } />
    // ];


    // let deliveryList = this.state.deliveries.map((delivery) => (
    // 		<DeliveryOverviewSingle
    // 			delivery={ delivery }
    // 			key={ delivery.id } />
    // 	));

    return(

      <div>

      </div>
    );
  }
};