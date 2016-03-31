import React, { Component } from 'react';
import Paper from 'material-ui/lib/paper';


export default class FloatingHeader extends Component {

  render() {
    let style = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.color,
      padding: '5px',
      position: 'relative',
      margin: '10px',
      top: '25px',
      left: '-5px'
    };
    let headerStyle = {
      position: 'relative',
      top: '5px',
      left: '10px',
    }
    return (
      <Paper style={ style }><h4 style={ headerStyle }>{ this.props.children }</h4></Paper>
    );
  }

}