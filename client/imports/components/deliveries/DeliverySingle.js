import React, { Component } from 'react';
import _ from 'lodash';

import Paper from 'material-ui/lib/paper';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import ListItem from 'material-ui/lib/lists/list-item';

import { DeliveryService } from '../services/delivery-service';
// import { FloatingHeader } from './floating-header.jsx';
import { Delivery } from '../models/deliveries';

export default class DeliveryOverviewSingle extends Component {

	constructor() {
		super();
	}

	render() {

		return(
			<div>
			<ListItem
		          primaryText={ this.props.delivery.deliveryNumber }
		          secondaryText={
		          	<p>
		          	hi
		              <span >{ this.props.delivery.tipAmount }</span><br />
		              <span >{ this.props.delivery.paymentType }</span><br />
		              <span >{ this.props.delivery.deliveryAmount }</span><br />
		            </p>
		          }
		          secondaryTextLines={3}
		        />
		        </div>
		)
	}
}