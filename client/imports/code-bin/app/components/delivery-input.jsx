import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';
import Paper from 'material-ui/lib/paper';
import Colors from 'material-ui/lib/styles/colors';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import KeyboardArrowLeft from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-left';
import { FloatingHeader } from './floating-header.jsx';
import AppBar from 'material-ui/lib/app-bar';
import { Delivery } from '../models/deliveries';
import RaisedButton from 'material-ui/lib/raised-button';
import React from 'react';
import _ from 'lodash';
import { DeliveryService } from '../services/delivery-service';
import { NavigationService } from '../services/navigation-service';


const DeliveryInput = React.createClass({

navBack() {
    NavigationService.popState();
  },

  getInitialState() {
    return {
      delivery: new Delivery({ shiftId: this.props.shiftId })
    }
  },

  handleChange(e) {
    let { delivery } = this.state;

    _.set(delivery, e.target.name, e.target.value);

    console.log(delivery);

    this.setState({ delivery });
  },

  paymentTypeHandler(event, index, value) {
      let { delivery } = this.state;
      delivery.paymentType = value;
      console.log(delivery);
      this.setState({ delivery });
  },


  handleToggle(e) {
    let { delivery } = this.state;

    delivery.isOut = !delivery.isOut;

    console.log(delivery);

    this.setState({ delivery });
  },

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

  },


  // Delivery Number, tip amount, 'out or not', payment option

  render() {

    const Style = {
      width: '100%',
      padding: '10px',
      backgroundColor: Colors.blueGrey50,
      height: 'calc(100vh - 64px)',
      display: 'inline-block'
    };

    const SaveButton = {
      width: '100%',
      height: '50px',
      backgroundColor: Colors.blueGrey700,
    };

    const SubStyle = {
      backgroundColor: Colors.grey100,
      padding: '15px'
    };

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
});

export { DeliveryInput }
