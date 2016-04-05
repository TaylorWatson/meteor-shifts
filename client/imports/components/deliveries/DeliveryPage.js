import React, { Component } from 'react';
import _ from 'lodash';

import ErrorHandler from '../../services/ErrorHandler';
import DatabaseService from '../../services/DatabaseService';
import Delivery from '../../models/Delivery';
import DeliveryInput from './DeliveryInput';
import SelectOption from '../ui/SelectOption';
import DeliverySingle from './DeliverySingle';

export default class DeliveryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deliveries: [],
      selectedTab: 1
    }
  }

  navBack() {
    window.history.back();
  }

  componentDidMount(prevProps){
    // this.deliveryList();
    $(this.refs.tabs).tabs();
    $(this.refs.tabs).tabs('select_tab', 'add');
  }

  handleTabChange(value) {
    this.setState({ value: value })
  }

  deliveryList() {
    Delivery.deliveryList(this.props.shiftId, delivery => {
      this.setState({ deliveries: delivery })
    });
    console.log(this.state.deliveries);
  }

  logChange(val) {
    console.log("Selected: " + val);
  }

  render() {


    let deliveryList = this.state.deliveries.map((delivery) => (
      <DeliverySingle
        delivery={ delivery }
        key={ delivery.id } />
    ));

    return(
      <div className="row">
        <div className="col s12">
          <ul className="tabs" ref='tabs'>
            <li className="tab col s6"><a href="#add">Add Delivery</a></li>
            <li className="tab col s6"><a href="#view">View Deliveries</a></li>
          </ul>
        </div>
        <div id="add" className="col s12">
          <DeliveryInput shiftId={ this.props.shiftId }/>
        </div>
        <div id="view" className="col s12">
          { deliveryList }
        </div>
      </div>
    );
  }
};