import React, { Component, PropTypes } from 'react';

export default class SelectOption extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    $(this.refs.select).material_select(() => {
          // This object is a fake 'event' ( event.target.value, event.target.name)
      console.log('Select updated with value: ', $(this.refs.select).val());
      this.props.onChange({ target: { value: $(this.refs.select).val(), name: this.props.name } });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      console.log('Updating select...');
      $(this.refs.select).material_select();
    }
  }

  componentWillUnmount() {
    $(this.refs.select).material_select('destroy');
  }

  render() {
    let { label, value, onChange, disabled, options } = this.props;

    let selectOptions = _.map(options, (option, i) => (
      <option value={ option.value } key={ option.value }>{ option.text }</option>
    ));

    return (
      <div className="input-field col s12">
        <label htmlFor={ this.props.name }>{ label }</label>
        <select ref="select" id={ this.props.name } name={ this.props.name } defaultValue='0' onChange={ this.changeHandler } value={ value }>
          <option value='0' key='0' disabled >Payment Type</option>
          { selectOptions }
        </select>
      </div>
    );
  }
}

