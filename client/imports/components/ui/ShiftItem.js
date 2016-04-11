import React, { Component } from 'react';
import _ from 'lodash';
import numeral from 'numeral';

export default class ShiftItem extends Component {

	constructor() {
		super();
	}

	render() {

		return(
			<li onClick={ this.props.onClick } className="collection-item card grey lighten-4 row waves-effect waves-block default" style={{ margin: '10px 10px 10px 10px' }}>
	    		<h5>Day: </h5>
		      <p>Title: </p>
		  	</li>
		)
	}
}