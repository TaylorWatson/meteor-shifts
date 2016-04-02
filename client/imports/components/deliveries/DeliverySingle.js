import React, { Component } from 'react';
import _ from 'lodash';

//import { DeliveryService } from '../services/delivery-service';
// import { FloatingHeader } from './floating-header.jsx';
//import { Delivery } from '../models/deliveries';

export default class DeliverySingle extends Component {

	constructor() {
		super();
	}

	componentDidMount() {
		Materialize.showStaggeredList('#deliveries');
	}

	render() {

		return(
			<ul className="collection" id='deliveries'>
				<li className="collection-item">
	      		<h5>Delivery Number: #3##</h5>
			      <p>Tip Amount: $XXX <br />
			         Payment Type: XXXX <br />
			         Delivery Amount: XXXXXX
			      </p>
			   </li>
	    	</ul>
		)
	}
}