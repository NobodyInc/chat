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
    this.state = {feed: []}
  }

  handleMessage(value) {
    socket.emit('send', {who: userId, message: value});
  }

  componentDidMount() {
    socket.on('message', feed => this.setState({feed}));
  }

  render() {
    return (<div>
      <header className="bar bar-nav">
        <h1 className="title">Messages</h1>
      </header>
      <div className="content content-padded">
        <ChatWindow
          isSelf={m => m.who === userId}
          feed={this.state.feed}
        />
        <footer>
          <hr/>
          <MessageBox
            placeholder={'Say something nice...'}
            handleMsg={this.handleMessage.bind(this)}
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
