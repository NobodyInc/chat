import * as React from 'react';
import * as Router from 'react-router';
import { run, DefaultRoute, Route, RouteHandler } from "react-router";
//import * as socketio from 'socket.io';
var io = require("socket.io-client");
import MessageBox from './components/messagebox';

let userId = Math.floor(Math.random() * 100000);

let socket = io('http://localhost:3700');

require("bootstrap-webpack");
require("./static/css/styles.css");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {feed: []}
  }
  handleMessage(value) {
    console.log('handler invoked');
    socket.emit('send', {who: userId, message: value});
  }
  componentDidMount() {
    console.log('mounted');
    socket.on('message', data => {
      console.log('data', data);
      this.setState({feed: data});
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <header className="bar bar-nav">
          <h1 className="title">Messages</h1>
        </header>
        <div className="content content-padded">
          <div className="convo"> {
           this.state.feed.map((m) => {
             return (
               <div className={"msg" + (m.who === userId? " msg-out" : "")}>
                 <div className="bubble">
                   <p>{m.message}</p>
                 </div>
               </div>
             );
           })
          } </div>
          <footer>
            <hr/>
            <MessageBox
              placeholder={'Say something nice...'}
              handleMsg={this.handleMessage.bind(this)}/>
          </footer>
        </div>
      </div>
    );
  }
}

//<Route name="home" handler={Home}/>
//<DefaultRoute>
const routes = (
  <Route name="app" path="/" handler={App}>
  </Route>
);

run(routes, (Handler) => React.render(<Handler/>, document.body));
