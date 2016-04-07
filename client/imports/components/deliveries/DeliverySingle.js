import React, { Component } from 'react';
import _ from 'lodash';

//import { DeliveryService } from '../services/delivery-service';
// import { FloatingHeader } from './floating-header.jsx';
//import { Delivery } from '../models/deliveries';

export default class DeliverySingle extends Component {

	constructor() {
		super();
	}

	render() {

		let { delivery } = this.props;
		let { deliveryNumber, tipAmount, paymentType } = delivery;
		tipAmount = new Number(tipAmount);
		let payment;

		switch (paymentType) {
			case 0:
				payment = "Cash";
				break;
			case 1:
				payment = "Debit";
				break;
			case 2:
				payment = "Credit Slip";
				break;
		}

		return(
			<li onClick={ this.props.onClick } className="collection-item card grey lighten-4 row waves-effect waves-block default" style={{ margin: '10px 10px 10px 10px' }}>
    		<h5>Delivery Number: { deliveryNumber }</h5>
	      <p>Tip Amount: ${ tipAmount.toFixed(2) } <br />
	         Payment Type: { payment }
	      </p>
		  </li>
		)
	}
}