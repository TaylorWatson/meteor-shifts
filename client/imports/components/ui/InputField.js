import React, { Component, PropTypes } from 'react';

export default class Input extends Component {
  constructor() {
    super()
  }

  render() {
    let { value, onChange, label, name, id } = this.props;
    return (
      <div className="input-field">
        <label htmlFor={ id || name } className={ value ? 'active' : '' }>{ label }</label>
        <input id={ id || name } name={ name } value={ value } onChange={ onChange } type="text"/>
      </div>
    );
  }
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  id: PropTypes.string
}