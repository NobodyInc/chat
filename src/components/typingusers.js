import * as React from 'react';

let { PropTypes, Component } = React;

export default class typingUsers extends Component {
  render() {
    return (<p> {
      Object.keys(this.state.users)
        //.filter(k => k != userId)
        .filter(this.props.isSelf)
        .filter(k => this.state.users[k].active)
        .map(k => (<span>{"User: " + k + " is typing.."}</span>))
    } </p>);
  }
}

typingUsers.propTypes = {
  isSelf: PropTypes.func
};

typingUsers.propTypes = {
  isSelf: () => true
};
