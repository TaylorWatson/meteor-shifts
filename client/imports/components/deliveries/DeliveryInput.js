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
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(e) {
    let { delivery } = this.props;
    delivery.isOut ?
    this.props.onChange({ target: { name: e.target.name, value: false } }) :
    this.props.onChange({ target: { name: e.target.name, value: true } });
  }

  render() {

    let { delivery } = this.props;

    console.log(delivery);

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
    var buttons = delivery._isNew ?
      [
        <button key={1} className="waves-effect waves-light btn col s11" style={{ width: '100%', margin: '5px 0px 5px 0px' }} onClick={ this.props.onSave }>Add Delivery</button>,
        <button key={3} className="waves-effect waves-light btn" style={{ width: '100%', margin: '5px 0px 10px 0px' }} onClick={ this.props.viewSummary }>View Summary</button>
      ] : [
        <button key={4} className="waves-effect waves-light btn" style={{ width: '100%', margin: '5px 0px 5px 0px' }} onClick={ this.props.onDelete }>Delete</button>,
        <button key={5} className="waves-effect waves-light btn" style={{ width: '100%', margin: '5px 0px 10px 0px' }} onClick={ this.props.onSave }>Update Delivery</button>
      ];

    return (
      <div className='card grey lighten-4 row' style={{ margin: '10px 10px 10px 10px' }}>
        <div className='card-content'>

          <InputField
            label="Delivery Number"
            name="deliveryNumber"
            onChange={ this.props.onChange }
            value={ delivery.deliveryNumber } />

          <InputField
            label="Tip Amount"
            name="tipAmount"
            onChange={ this.props.onChange }
            value={ delivery.tipAmount } />

          <div className="switch row">
            <div className='col s9' style={{ marginTop: '5px' }}>
              <label className=''>Is Out</label>
            </div>
            <div className='col s3'>
              <label>
                <input type="checkbox" onChange={ this.handleToggle } name="isOut" checked={ delivery.isOut } style={{ marginRight: '10px' }} />
                <span className="lever"></span>
              </label>
            </div>
          </div>

          <SelectOption
            options={ options }
            name="paymentType"
            value={ delivery.paymentType }
            onChange={ this.props.onChange } />

        </div>

        <div className='container'>
          { buttons }
        </div>
      </div>
    );
  }
};
