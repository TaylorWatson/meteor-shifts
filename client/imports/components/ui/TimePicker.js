import '../../assets/time-picker/materialize.clockpicker';
import React, { Component, PropTypes } from 'react';

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

    if (this.props.value) {
      // set the value for editing purposes.
    }
  }

  timeDone() {
    console.log('Time picked!', $(this.refs.timeInput).val());
  }

  render() {
    return (
      <input id={ this.props.name } name={ this.props.name } ref='timeInput' className="timepicker" type="text" />
    )
  }
}

TimePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string
}