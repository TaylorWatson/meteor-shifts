import React, { Component } from 'react';

export default class HelpClock extends Component {
  render() {
    return (
      <div className="container">
        <h4>Clocking In Anonymously.</h4>
        <p className="flow-text">It is not required that you enter all your shifts in the system. If you would rather clock in when you arrive at work, simply just press the clock in now button on the home screen.</p>
        <img src="/images/anonymous-shift.png" alt="Anonymous Shift" className="responsive-img"/>
        <p className="flow-text">Select the time you want to clock in and select close.</p>
        <img src="/images/anonymous-shift-time.png" alt="Anonymous Time" className="responsive-img"/>
        <p className="flow-text">Upon choosing a time, the shift will start, and you are ready to start entering deliveries!</p>
        <img src="/images/delivery-input.PNG" alt="Delivery Input" className="responsive-img"/>
      </div>
    );
  }
}