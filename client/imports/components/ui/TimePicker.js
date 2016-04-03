import '../../assets/time-picker/materialize.clockpicker';
import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class TimePicker extends Component {
  constructor() {
    super();

    this.timeDone = this.timeDone.bind(this);
    this.setValue = this.setValue.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentDidMount() {
    $(this.refs.timeInput).pickatime({
      twelvehour: true,
      donetext: 'Done',
      afterDone: this.timeDone
    });
  }

  setValue() {}

  clear() {}

  timeDone() {
    let value = $(this.refs.timeInput).val(),
        name = this.props.name;

    this.props.onChange({ 
      target: { 
        name, 
        value
      }
    });
  }

  render() {
    let value = this.props.value;
    if (value && value.length > 10) {
      value = moment(new Date(this.props.value)).format('hh:mmA');
    } else if (value == "undefined") {
      value = '';
    }
    return (
      <div className="input-field">
        <label htmlFor="startTime" ref="label" className={ value ? 'active' : '' }>{ this.props.label }</label>
        <input id={ this.props.name } name={ this.props.name } value={ value } readOnly ref='timeInput' className="timepicker" type="text" />
      </div>
    )
  }
}

TimePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}