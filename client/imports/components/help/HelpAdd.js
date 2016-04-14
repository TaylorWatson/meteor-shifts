import React, { Component } from 'react';

export default class HelpAdd extends Component {

	constructor() {
		super();
	}

	componentDidMount() {
      $(this.refs.slider).slider({
      	full_width: true

      });
	}

  render() {
    return (
      <div ref='slider' className="slider fullscreen">
	    <ul className="slides">
	      <li>
	        <img src="/images/welcome-1.png" />
	        <div className="caption center-align">
	          <h3 className='grey-text text-darken-4'>Welcome to Shifts!</h3>
	        </div>
	      </li>
	      <li>
	        <img src="/images/welcome-2.png" />
	        <div className="caption center-align">
	          <h3 style={{ margin: '0' }} className='grey-text text-darken-4'>To add a shift</h3>
	          <h5 className='grey-text text-darken-4'>Enter in the information</h5>
	        </div>
	      </li>
	      <li>
	        <img src="/images/welcome-3.png" />
	        <div className="caption center-align">
	          <h3 className='grey-text text-darken-4'>Click a shift to start</h3>
	          <h5 className="grey-text text-darken-4">Start any shift starting soon by hitting start</h5>
	        </div>
	      </li>
	      <li>
	        <img src="/images/report.PNG" />
	        <div className="caption center-align">
	          <h3>This is our big Tagline!</h3>
	          <h5 className="light grey-text text-lighten-3">Here's our small slogan.</h5>
	        </div>
	      </li>
	    </ul>
	  </div>
    );
  }
}