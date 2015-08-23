import * as React from 'react';
import * as Router from 'react-router';
import { run, DefaultRoute, Route, RouteHandler } from "react-router";

import MessageBox from './components/messagebox';

require("bootstrap-webpack");
require("./static/css/styles.css");

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <header className="bar bar-nav">
          <h1 className="title">Messages</h1>
        </header>
        <div className="content content-padded">
          <div className="convo">
            <div className="msg">
              <div className="bubble">
                <p>Yo! You there?</p>
              </div>
            </div>
            <div className="msg msg-out">
              <div className="bubble">
                <p>Yeah, sup?</p>
              </div>
            </div>
          </div>
          <footer>
            <hr/>
            <MessageBox placeholder={'Say something nice...'} handleMsg={(value) => console.log('value', value)}/>
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
