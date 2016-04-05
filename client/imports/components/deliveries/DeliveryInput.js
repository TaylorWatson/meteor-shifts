import React, { Component } from 'react';
import _ from 'lodash';


import { CASH, DEBIT, CREDIT_CARD_SLIP } from '../../enum/paymentOptions';
import ErrorHandler from '../../services/ErrorHandler';
import DatabaseService from '../../services/DatabaseService';
import Delivery from '../../models/Delivery';

import InputField from '../ui/InputField';
import SelectOption from '../ui/SelectOption';

export default class DeliveryInput extends Component {

  navBack() {
    window.history.back();
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.submitDelivery = this.submitDelivery.bind(this);
    if (this.props.shiftId) {
      this.state = {
      delivery: new Delivery({ shiftId: this.props.shiftId })
      }
    }
  }

  handleChange(e) {
    let { delivery } = this.state;

    _.set(delivery, e.target.name, e.target.value);

    console.log(delivery);

    this.setState({ delivery });
  }


  handleToggle(e) {
    let { delivery } = this.state;

    delivery.isOut = !delivery.isOut;

    console.log(delivery);

    this.setState({ delivery });
  }

  submitDelivery() {

    let { delivery } = this.state;

    Delivery.addDelivery(delivery, (err, result) => {

      if (err) {
        console.log('ERROR!');
      } else {
        console.log('Success!');
      }

    });
    console.log('SUBMITTING DELIVERY: ', delivery);
  }

  render() {

    let { delivery } = this.state;
    {/*let options = ['Cash', 'Debit', 'Credit slip'];*/}

    let options = [{
      value: CASH,
      text: 'Cash'
    }, {
      value: DEBIT,
      text: 'Debit'
    }, {
      value: CREDIT_CARD_SLIP,
      text: 'Credit Slip'
    }];

    return (
      <div className='card grey lighten-4 row' style={{ margin: '10px 10px 10px 10px' }}>
        <div className='card-content'>

          <InputField
            label="Delivery Number"
            name="deliveryNumber"
            onChange={ this.handleChange }
            value={ delivery.deliveryNumber } />

          <InputField
            label="Tip Amount"
            name="tipAmount"
            onChange={ this.handleChange }
            value={ delivery.tipAmount } />

         <InputField
            label="Delivery Amount"
            name="deliveryAmount"
            onChange={ this.handleChange }
            value={ delivery.deliveryAmount } />

          <div className="switch row">
            <div className='col s9' style={{ marginTop: '5px' }}>
              <label className=''>Is Out</label>
            </div>
            <div className='col s3'>
              <label>
                <input type="checkbox" onChange={ this.handleToggle } checked={ delivery.isOut } style={{ marginRight: '10px' }} />
                <span className="lever"></span>
              </label>
            </div>
          </div>

          <SelectOption
            options={ options }
            name="paymentOption"
            value={ delivery.paymentType }
            onChange={ this.handleChange } />
         </div>
         <div className='container'>
          <button className="waves-effect waves-light btn col s11" style={{ margin: '10px' }} onClick={ this.submitDelivery }>Add Delivery</button>
         </div>
      </div>
    );
  }
};
