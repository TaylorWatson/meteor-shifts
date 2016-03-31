import Paper from 'material-ui/lib/paper';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import { FloatingHeader } from './floating-header.jsx';
import { Delivery } from '../models/deliveries';
import RaisedButton from 'material-ui/lib/raised-button';
import React, { Component } from 'react';
import _ from 'lodash';
import { DeliveryService } from '../services/delivery-service';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export default class DeliveryOverview extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		return(
			<div>
			</div>
		)
	}

}