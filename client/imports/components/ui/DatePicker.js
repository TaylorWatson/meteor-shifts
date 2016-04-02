import React, { Component, PropTypes } from 'react';

export default class DatePicker extends Component {
  constructor() {
    super()
  }

  componentDidMount() {

    $(this.refs.datePicker).pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      
    });

  }

  handleChange(newDate) {
    console.log('Date changed!');
    console.log(arguments);
  }

  render() {
    return (
      <input type="date" id={ this.props.id || this.props.name } name={ this.props.name } onChange={ this.handleChange } ref='datePicker' className="datepicker" />
    );
  }
}

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string
}