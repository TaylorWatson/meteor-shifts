import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class DatePicker extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.setValue = this.setValue.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentDidMount() {

    $(this.refs.datePicker).pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      onClose: this.handleChange
    });

    if (this.props.value) this.setValue();

  }

  componentWillUpdate(previousProps) {
    if (!this.props.value && previousProps.value) {
      this.clear();
    } else if (this.props.value && !previousProps.value) {
      this.setValue();
    }
  }

  setValue() {
    $(this.refs.datePicker).val(moment(new Date(this.props.value))
      .format('D, MMMM, YYYY'));
  }

  clear() {
    $(this.refs.datepicker).val('');
  }

  handleChange(newDate) {
    let value = $(this.refs.datePicker).val();
    if (!value) return;
    let date = new Date(value);
    
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
    let id = this.props.id || this.props.name;
    return (
      <div className="input-field">
        <label htmlFor={ id } ref="label" className={ this.props.value ? 'active' : '' }>{ this.props.label }</label>
        <input type="date" id={ id } name={ this.props.name } onChange={ this.handleChange } ref='datePicker' className="datepicker" />
      </div>
    );
  }
}

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string
}