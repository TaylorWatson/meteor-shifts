import React, { Component } from 'react';
import _ from 'lodash';
import numeral from 'numeral';
import moment from 'moment';

export default class ShiftItem extends Component {

	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.shift(this.props);
	}

	render() {

		let startRange = moment(new Date(this.props.startTime)).calendar();
   	let endRange = moment(new Date(this.props.endTime)).calendar();

		return(
			<li onClick={ this.handleClick } className="collection-item card grey lighten-4 row waves-effect waves-block default" style={{ margin: '10px 10px 10px 10px' }}>
           <div className="collapsible-header grey lighten-4" style={{ padding: '5px 5px 5px 5px'}}>
             <h5 className='flow-text'><strong>Date: { `${startRange} - ${endRange}` }</strong></h5>
             <h5 className='flow-text'><strong>{ this.props.title }</strong></h5>
             <h5 className='flow-text'>{ this.props.location }</h5>
           </div>
         </li>
		)
	}
}