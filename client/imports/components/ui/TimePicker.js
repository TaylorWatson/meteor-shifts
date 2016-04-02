import '../../assets/time-picker/materialize.clockpicker';
import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class TimePicker extends Component {
  constructor() {
    super();

    this.timeDone = this.timeDone.bind(this);
  }

  componentDidMount() {
    $(this.refs.timeInput).pickatime({
      twelvehour: true,
      donetext: 'Done',
      afterDone: this.timeDone
    });
  }

  timeDone() {
    let timeString = $(this.refs.timeInput).val();

    let [ hours, minutes ] = timeString.split(":");
    hours = new Number(hours).valueOf();
    let a = minutes.substr(2, 2);
    minutes = new Number(minutes.substr(0, 2)).valueOf();

    if (a == "PM" && hours !== 12) {
      hours += 12;
    }

    this.props.onChange({ 
      target: { 
        name: this.props.name, 
        value: {
          hour: hours,
          minute: new Number(minutes).valueOf(),
          second: 0,
          millisecond: 0
        }
      }
    });
  }

  render() {
    let value = '';
    if (this.props.value) {
      value = moment(new Date(this.props.value)).format('hh:mmA');
    }
    return (
      <input id={ this.props.name } name={ this.props.name } value={ value } ref='timeInput' className="timepicker" type="text" />
    )
  }
}

TimePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.object
}