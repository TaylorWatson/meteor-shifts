import React, { Component } from 'react';

export default class HelpDelivery extends Component {
  render() {
    return (
      <div className="container">
        <h4>Adding Deliveries</h4>
        <br/>
        <p className="flow-text">Adding deliveries to your shift was designed to be quick, seamless, and simple.</p>
        <p className="flow-text">While working your shift you simply enter your delivery information and click "Add Delivery"</p>
        <img src="/images/delivery-input.PNG" alt="Delivery Input" className="responsive-img"/>
        <p class="flow-text">When working throughout your shift you are able to review the list of deliveries you've taken at any time.</p>
        <img src="/images/delivery-overview.PNG" alt="Delivery Overview" className="responsive-img"/>
        <p className="flow-text">At any time you can select one of these deliveries to edit the information previously entered. This is great if a tip changes, or if you mistyped a tip.</p>
        <p class="flow-text">You are also able to view the shift summary, which calculates many metrics about the shift you're currently working.</p>
        <p className="flow-text">Simply click the "View Summary" button</p>
        <img src="/images/delivery-summary.png" alt="Delivery Summary" className="responsive-img"/>
      </div>
    );
  }
}