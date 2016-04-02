import React, { Component, PropTypes } from 'react';

export default class DatePicker extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

    $(this.refs.datePicker).pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      onClose: this.handleChange
    });

  }

  handleChange(newDate) {
    let date = new Date($(this.refs.datePicker).val());
    
    this.props.onChange({
      target: {
        name: this.props.name,
        value: {
          year: date.getFullYear(),
          month: date.getMonth(),
          date: date.getDate()
        }
      }
    });
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