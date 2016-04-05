import React, { Component, PropTypes } from 'react';

export default class Input extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    $(this.refs.input).off();
  }

  render() {
    let { value, onChange, label, name, id, icon } = this.props;
    if (icon) {
      icon = <i className="prefix">{ icon }</i>;
    }
    let labelClass = "";
    if (value || value == 0) {
      labelClass = "active";
    }
    return (
      <div className="input-field">
        { icon }
        <label htmlFor={ id || name } className={ labelClass }>{ label }</label>
        <input id={ id || name } ref="input" name={ name } value={ value } onChange={ onChange } type="text"/>
      </div>
    );
  }
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  icon: PropTypes.object
}