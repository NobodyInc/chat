import * as React from 'react';

let { PropTypes, Component } = React;

export default class typingUsers extends Component {
  render() {
    return (
      <p> {
        Object.keys(this.state.users)
          //.filter(user => user != userId)
          .filter(this.props.isSelf)
          .filter(user => this.state.users[user].active)
          .map(user => (<span>{'User: ' + user + ' is typing..'}</span>))
      } </p>
    );
  }
}

typingUsers.propTypes = {
  isSelf: PropTypes.func,
};

typingUsers.propTypes = {
  isSelf: () => true,
};
