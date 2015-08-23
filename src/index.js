import * as React from 'react';
import io from "socket.io-client";
import { run, DefaultRoute, Route, RouteHandler } from "react-router";

import { MessageBox, ChatWindow } from './components';

//import Messages from './data';
//let messages = Messages('http://localhost:3700');
//messages.send();
//messages.listen();

let userId = Math.floor(Math.random() * 100000);

let socket = io('http://0.0.0.0:3700');

//require("./static/css/ratchet");
require("./static/css/styles.css");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {feed: [], users: {}}
  }

  handleMessage(value) {
    socket.emit('send', {who: userId, message: value});
  }

  componentDidMount() {
    socket.on('message', feed => this.setState({feed}));
    socket.on('status', users => this.setState({users}));
  }

  handleStatus(active) {
    socket.emit('status', {who: userId, active});
  }

  render() {
    const typingUsers = Object.keys(this.state.users)
      .filter(k => k != userId)
      .filter(k => this.state.users[k].active)
      .map(k => (<span>{"User: " + k + " is typing.."}</span>));

    return (<div>
      <header className="bar bar-nav">
        <h1 className="title">Messages</h1>
      </header>
      <div className="content content-padded">
        <ChatWindow
          isSelf={m => m.who === userId}
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

const routes = (
  <Route name="app" path="/" handler={App}>
  </Route>
);

run(routes, (Handler) => React.render(<Handler/>, document.body));

//if (state.user) {
//  run(routes, (Handler) => React.render(<Handler/>, document.body));
//} else { }
