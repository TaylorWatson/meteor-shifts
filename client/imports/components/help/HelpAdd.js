import React, { Component } from 'react';

export default class HelpAdd extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        <h4>Adding a Shift.</h4>
        <br/>
        <p className="flow-text">Adding a shift in our application is accessible at all times through the application bar in the top right.</p>
        <p className="flow-text">Fill out the selected details, as well as the time the shift should start. (End time is optional)</p>
        <img src="/images/welcome-2.png" alt="Shift Entry" className="responsive-img"/>
        <p className="flow-text">Your shift, if not in the past, will now show up at the home screen.</p>
        <img src="/images/shift-overview.PNG" alt="Overview" className="responsive-img"/>
      </div>
    );
  }
}