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
      selectedTab: 1,
      delivery: new Delivery({ shiftId: this.props.shiftId })
    }

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.refreshDeliveries = this.refreshDeliveries.bind(this);
    this.selectDelivery = this.selectDelivery.bind(this);
    this.clockOut = this.clockOut.bind(this);
  }

  navBack() {
    window.history.back();
  }

  componentDidMount(){
    this.refreshDeliveries();
    $(this.refs.tabs).tabs();
    $(this.refs.tabs).tabs('select_tab', 'add');
  }

  handleTabChange(value) {
    this.setState({ value: value })
  }

  handleChange(e) {
    let { delivery } = this.state;
    let { target: { value:v, name:n } } = e;

    delivery[n] = v;
    this.setState({ delivery });
  }

  handleSave() {
    let { delivery } = this.state;
    delivery.save((err, result) => {
      if (err) {
        Materialize.toast(err, 3500);
      } else {
        this.setState({ delivery: new Delivery({ shiftId: this.props.shiftId }) });
        this.refreshDeliveries();
      }
    });
  }

  refreshDeliveries() {
    Delivery.deliveryList(this.props.shiftId, (err, deliveries) => {
      this.setState({ deliveries });
    });
  }

  selectDelivery(delivery) {
    return () => {
      this.setState({ delivery });
      $(this.refs.tabs).tabs('select_tab', 'add');
    }
  }

  clockOut() {
    Shift.clockOutTime(this.props.shiftId, (err, result) => {
      if (err) console.error(err);
      else {
        console.log('Clocked out!');
        console.log(result);

        FlowRouter.go('/');
      }
    });
  }

  render() {

    let deliveryList = this.state.deliveries.map((delivery) => (
      <DeliverySingle
        delivery={ delivery }
        key={ delivery.id }
        onClick={ this.selectDelivery(delivery) } />
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
          <DeliveryInput delivery={ this.state.delivery } clockOut={ this.clockOut } onChange={ this.handleChange } onSave={ this.handleSave }/><br />

        </div>
        <div id="view" className="col s12">

          <ul className="collection" id='deliveries'>
            { deliveryList }
          </ul>

        </div>
      </div>
    );
  }
};