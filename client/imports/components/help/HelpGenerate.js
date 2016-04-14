import React, { Component } from 'react';

export default class HelpGenerate extends Component {
  render() {
    return (
      <div className="container">
        <h4>Generating Reports</h4>
        <h5>& viewing old shift summaries.</h5>
        <br/>
        <p className="flow-text">Generating reports can be used to view old shifts worked, as well as to find totals and statistics across a time-span that can be selected by you.</p>
        <p className="flow-text">From the navigation bar side menu, select "Reporting"</p>
        <img src="/images/side-menu.png" alt="Side Menu" className="responsive-img"/>
        <p className="flow-text">From within the dropdown, select the date range you would like to query for results.</p>
        <img src="/images/report-range.png" alt="Reporting Range" className="responsive-img"/>
        <p className="flow-text">Click generate, and it will change to the screen showing all your statistic across all shifts in that date range.</p>
        <img src="/images/report.PNG" alt="Report" className="responsive-img"/>
        <p className="flow-text">From this page you can click "View Shifts" to view each individual shift involved in the query</p>
        <img src="/images/report-shifts.PNG" alt="Report Shifts" className="responsive-img"/>
        <p>Selecting one of these shifts will bring you to the overview page with that specific shift.</p>
      </div>
    );
  }
}