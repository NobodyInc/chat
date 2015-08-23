import * as React from 'react';
import * as Router from 'react-router';
import { run, DefaultRoute, Route, RouteHandler } from "react-router";

import MessageBox from './components/messagebox';

require("bootstrap-webpack");
require("./static/css/styles.css");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [
        {who: 0, message: "Yo!, You there?"},
        {who: 1, message: "Yeah, sup?"},
        {who: 0, message: "Let's grab lunch."},
        {who: 1, message: "Erm, erm can't. Erm, erm sorry."},
        {who: 0, message: "Ok, I'm not dissapointed"},
        {who: 0, message: "No worries, next time."},
        {who: 1, message: "fo sho"},
      ]
    }
  }
  //<div className="msg">
  //  <div className="bubble">
  //    <p>Yo! You there?</p>
  //  </div>
  //</div>
  //<div className="msg msg-out">
  //  <div className="bubble">
  //    <p>Yeah, sup?</p>
  //  </div>
  //</div>
  handleMessage(value) {
    this.setState({feed: this.state.feed.concat([{who: 1, message: value}])})
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
               <div className={"msg" + (m.who === 1? " msg-out" : "")}>
                 <div className="bubble">
                   <p>{m.message}</p>
                 </div>
               </div>
             )
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
