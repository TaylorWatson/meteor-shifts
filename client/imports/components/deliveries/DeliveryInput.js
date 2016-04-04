import React, { Component } from 'react';
import _ from 'lodash';

import ErrorHandler from '../../services/ErrorHandler';
import DatabaseService from '../../services/DatabaseService';
import Delivery from '../../models/Delivery';

export default class DeliveryInput extends Component {

navBack() {
    window.history.back();
  }

  constructor() {
    super();
    this.state = {
      delivery: new Delivery({ shiftId: this.props.shiftId })
    }
  }

  handleChange(e) {
    let { delivery } = this.state;

    _.set(delivery, e.target.name, e.target.value);

    console.log(delivery);

    this.setState({ delivery });
  }

  paymentTypeHandler(event, index, value) {
      let { delivery } = this.state;
      delivery.paymentType = value;
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

    DeliveryService.addDelivery(delivery, (err, result) => {

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

    return (
      <div>
          <Paper style={ Style } zDepth={2}>

          <FloatingHeader backgroundColor={ Colors.blueGrey900 } color={ Colors.grey50 }>Delivery Inputs</FloatingHeader>

          <Paper style={ SubStyle } zDepth={1}><br />

            <TextField name="deliveryNumber" hintText="ex. 103" value={ delivery.deliveryNumber } fullWidth onChange={ this.handleChange } /><br />
            <TextField name="tipAmount" hintText="3.49" value={ delivery.tipAmount } fullWidth onChange={ this.handleChange } /><br /><br />

            <Toggle
              label="Is Out"
              onToggle={ this.handleToggle }
              toggled={ delivery.isOut } />

            <SelectField fullWidth value={ delivery.paymentType } onChange={ this.paymentTypeHandler }>
              <MenuItem value={1} primaryText="Cash"/>
              <MenuItem value={2} primaryText="Debit"/>
              <MenuItem value={3} primaryText="Credit Card Slip"/>
            </SelectField>

          </Paper>
          <RaisedButton label="Add Delivery" onMouseUp={ this.submitDelivery } style={ SaveButton } />
         </Paper>
      </div>
    );
  }
};
