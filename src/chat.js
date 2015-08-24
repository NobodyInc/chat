import * as React from 'react';
import * as data from './data';

import {
  MessageBox,
  ChatWindow,
  typingUsers,
} from './components';

export default class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {feed: [], users: {}}
    this.userId = data.getUser();
  }

  handleMessage(value) {
    data.sendMessage(this.userId, value);
  }

  componentDidMount() {
    data.listen('message', feed => this.setState({feed}));
  }

  handleStatus(active) {
    //socket.emit('status', {who: userId, active});
  }

  render() {
    const typingUsers = Object.keys(this.state.users)
      .filter(k => k != this.userId)
      .filter(k => this.state.users[k].active)
      .map(k => (<span>{"User: " + k + " is typing.."}</span>));

    return (<div>
      <header className="bar bar-nav">
        <h1 className="title">Messages</h1>
      </header>
      <div className="content content-padded">
        <ChatWindow
          isSelf={m => m.who === this.userId}
          feed={this.state.feed}
        />
        <p> { typingUsers } </p>
        <footer>
          <hr/>
          <MessageBox
            placeholder={'Say something nice...'}
            handleMsg={this.handleMessage.bind(this)}
            handleStatus={this.handleStatus.bind(this)}
          />
        </footer>
      </div>
    </div>);
  }
}
