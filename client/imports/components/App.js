import React from 'react';

export default class App extends React.Component {

  render() {

    let style = {
      margin: '15px',
      borderRadius: '0'
    }

    return (
      <div className="ui segment" style={style}>
        <h1 className="ui dividing header">{ this.props.text || 'Hello World!' }</h1>

        <p>Count: { this.props.count }</p>

        <div className="ui right aligned basic segment">
          <div className="ui blue basic button" onClick={ this.props.increment }>Click Me!</div>
        </div>
      </div>
    );

  }

}
