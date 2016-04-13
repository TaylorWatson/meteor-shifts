import React, { Component } from 'react';

export default class Help extends Component {
  render() {
    return (
      <div className="container">
        <h4>Welcome to Shifts!</h4>
        <h5>A delivery tracking system for delivery drivers.</h5>
        <p>Feel free to read on any of the tutorials below before using the main app. When you're finished, head to the settings page to configure your job metrics. (Your hourly rate, delivery bonuses, etc.)</p>
        <ul className="collection">
          <li className="collection-item"><a href="/help/add">Adding a shift</a></li>
          <li className="collection-item"><a href="/help/clock">Clocking in for an anonymous shift.</a></li>
          <li className="collection-item"><a href="/help/add-delivery">Adding deliveries taken to your shift.</a></li>
          <li className="collection-item"><a href="/help/view-sum">Viewing shift's summary and stats.</a></li>
          <li className="collection-item"><a href="/help/generate">Generating a report.</a></li>
        </ul>
        <a href="/settings" style={{ width: '100%', margin: '5px 0px 5px 0px' }} className="waves-effect waves-light btn">Configure Settings</a>
      </div>
    );
  }
}