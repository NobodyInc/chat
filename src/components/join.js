import * as React from 'react';

let { PropTypes, Component } = React;

class Join extends React.Component {
  handleSubmit() {
  }

  render() {
    return (<form onSubmit={this.handleSubmit.bind(this)}>
      <h1 className="bar bar-nav">choose username</h1>
    </form>);
  }
}

