import React, { Component, PropTypes } from 'react';

export default class SelectOption extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    $(this.refs.select).material_select();
  }

  render() {
    let { label, disabled, options } = this.props;
    let [ ...selectOptions ] = options;
    let i = 1;
    let blah = [];
    for( let option of selectOptions) {
      blah.push(<option value={ i }>{option} { i++ }</option>);
    }
    return (
      <div className="input-field col s12">
        <select ref='select'>
          <option value='0' disabled>Choose your option</option>
          { blah }
        </select>
        <label>{ label }</label>
      </div>
    );
  }
}

