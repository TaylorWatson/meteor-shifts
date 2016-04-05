import React, { Component, PropTypes } from 'react';

import Setting from '../models/Setting';
import InputField from '../components/ui/InputField';

import AttachMoney from 'material-ui/lib/svg-icons/editor/attach-money';

export default class Settings extends Component {

  constructor() {
    super();

    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    Setting.findOrCreate((err, setting) => {
      console.log('Setting state with setting: ', setting);
      this.setState({ setting });
    });
  }

  handleChange(e) {
    let setting = this.state.setting;
    setting[e.target.name] = e.target.value;
    this.setState({ setting });
  }

  save() {
    let setting = this.state.setting;

    setting.save((err, result) => {
      Materialize.toast('Settings have been saved!', 3000);
    });
  }

  render() {
    let { setting } = this.state;
    if (!setting) return <div />;

    return (
      <div className="container">

        <br/>
        <h4>Application Settings</h4>
        <br/>

        <InputField
          label="Hourly Income"
          name="hourlyRate"
          onChange={ this.handleChange }
          value={ setting.hourlyRate }
          icon={ <AttachMoney /> } />

        <InputField
          label="Out Bonus"
          name="outBonus"
          onChange={ this.handleChange }
          value={ setting.outBonus }
          icon={ <AttachMoney /> } />

        <InputField
          label="Debit Fee"
          name="debitFee"
          onChange={ this.handleChange }
          value={ setting.debitFee }
          icon={ <AttachMoney /> } />

        <InputField
          label="Delivery Bonus"
          name="unitBonus"
          onChange={ this.handleChange }
          value={ setting.unitBonus }
          icon={ <AttachMoney /> } />

        <div onClick={ this.save } className="waves-effect waves-light btn" style={{ width: '100%' }}>
          Save Settings
        </div>

      </div>
    );
  }
}