import React, { Component, PropTypes } from 'react';

export default class SelectOption extends Component {
  constructor() {
    super()
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    $(this.refs.select).material_select();
  }

  changeHandler(value) {
      this.props.value = value;
      console.log(value);
  }

  render() {
    let { label, value, onChange, disabled, options } = this.props;
    let [ ...selectOptions ] = options;
    let i = 1;
    let propOptions = [];
    for( let option of selectOptions) {
      propOptions.push(<option value={ i } key={ i++ }>{option}</option>);
    }
    return (
      <div className="input-field col s12">
        <select onChange={ this.changeHandler } defaultValue='0'>
          <option value='0' key='0' disabled>Choose option</option>
          { propOptions }
        </select>
        <label>{ label }</label>
      </div>
    );
  }
}

