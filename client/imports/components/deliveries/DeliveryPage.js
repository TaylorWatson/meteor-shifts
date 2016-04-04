import React, { Component } from 'react';
import _ from 'lodash';

import ErrorHandler from '../../services/ErrorHandler';
import DatabaseService from '../../services/DatabaseService';
import Delivery from '../../models/Delivery';
import DeliveryInput from './DeliveryInput';

export default class DeliveryPage extends Component {

  constructor() {
    super();

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
    //this.deliveryList();
  }

  handleTabChange(value) {
    this.setState({ value: value })
  }

  deliveryList() {
    DatabaseService.deliveryList(this.props.shiftId, delivery => {
      this.setState({ deliveries: delivery })
    });
  }

  // openModal() {
  //   this.setState({ modalVisible: true });
  // }

  // handleClose() {
  //   console.log(arguments);
  //   this.setState({ modalVisible: false });
  // }

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
    //    <DeliveryOverviewSingle
    //      delivery={ delivery }
    //      key={ delivery.id } />
    //  ));

    return(

      <div className="row">
        <div className="col s12">
          <ul className="tabs">
            <li className="tab col s3"><a className="active" href="#test1">Test 1</a></li>
            <li className="tab col s3"><a  href="#test2">Test 2</a></li>
          </ul>
        </div>
        <div id="test1" className="col s12">
        hi
        </div>
        <div id="test2" className="col s12">Test 2</div>
      </div>
    );
  }
};