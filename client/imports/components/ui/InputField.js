import React, { Component, PropTypes } from 'react';

export default class Input extends Component {
  constructor() {
    super();
    this.updateCurrencyValue = this.updateCurrencyValue.bind(this);
  }

  componentDidMount() {
    this.updateCurrencyValue();
  }

  updateCurrencyValue() {
    if (this.props.type == "currency") {
      let v = Number($(this.refs.input).val()).toFixed(2);
      $(this.refs.input).val(v);
    }
  }

  shouldComponentUpdate(nextProps) {
    return (this.props.value != nextProps.value);
  }

  componentWillUnmount() {
    $(this.refs.input).off();
  }

  render() {
    let { value, onChange, label, name, id, icon, type } = this.props;
    if (icon) {
      icon = <i className="prefix">{ icon }</i>;
    }
    let labelClass = "";
    if (value || value == 0) {
      labelClass = "active";
    }

    let props = {
      id: id || name,
      ref: 'input',
      name,
      value,
      onChange,
      type: 'text'
    }

    if (type && type == "currency") {
      props.type = 'number';
      props.step = '0.01';
      props.min = '0';
    }

    return (
      <div className="input-field">
        { icon }
        <label htmlFor={ id || name } className={ labelClass }>{ label }</label>
        <input { ...props } />
      </div>
    );
  }
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  icon: PropTypes.object,
  type: PropTypes.string
}