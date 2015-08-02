import * as React from "react";
import { default as immstruct } from "immstruct";
import { default as component } from "omniscient";
import { run, DefaultRoute, Link, Route, RouteHandler, HistoryLocation } from "react-router";

import { mapObject, wrapper } from "./util";

require("bootstrap-webpack");
require("./static/css/styles.css");

let structure = immstruct({
  user: { name: "me" },
  chats: {
    "a0": {
      "name": "Paper Airplanes",
      "users": [
        {"id": 0, "name": "tommy"},
        {"id": 1, "name": "phil"},
        {"id": 2, "name": "lil"}
      ],
      "feed": [
        {"id": 0, "user_id": 0, "message": "What's up?"},
        {"id": 1, "user_id": 1, "message": "Meh..."},
        {"id": 1, "user_id": 1, "message": "Paper Airplanes are up... Heh!"},
        {"id": 2, "user_id": 1, "message": "Idiot! Lol!"}
      ]
    }
  }
});

let App = component(() => {
  return <div className="container-fluid"><RouteHandler/></div>
}).jsx;

let Home = component(() => {
  return <div className="row"></div>
}).jsx;

let Chat = component({
  getInitialState: function() {
    return {buffer: ""}
  },
  handleKeyPress: function(e) {
    const buffer = this.state.buffer;
    if(e.which === 13) {
      this.props.chat_id.cursor("feed").push({"id": -1, "user_id": -1, "message": buffer});
      this.setState({buffer: ""});
    } else {
      this.setState({buffer: buffer + String.fromCharCode(e.which)});
    }
  }}, function ({chat_id: chat}) {
  return <div className="row">
    <div className="col-sm-3 col-md-2 sidebar">
      <ul>{chat.cursor("users").toJS().map((user) => <li key={user.id}>{user.name}</li>)}</ul>
    </div>
    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
      <h1 className="page-header">{chat.get("name")}</h1>
      <div className="row">
        <div className="">
          <ul className="nav nav-sidebar">{chat.cursor("feed").toJS().map((message) => <li>
            <span>{chat.cursor(["users", message.user_id, "name"]).toJS()}</span><span>{message.message}</span>
          </li>)}</ul>
        </div>
      </div>
    </div>
    <div className="row"><div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2">
      <div className="input-group input-group-lg">
        <span className="input-group-addon" id="sizing-addon1">@</span>
        <input type="text" className="form-control" placeholder="Message" aria-describedby="sizing-addon1" onKeyPress={this.handleKeyPress} value={this.state.buffer}/>
      </div>
    </div></div>
  </div>
}).jsx;

const routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="home" handler={Home}/>
    <Route name="chat" path="/chat/:chat_id" handler={wrapper(Chat, {"chat_id": (id) => structure.cursor(["chats", id])})}/>
    <DefaultRoute handler={""}/>
  </Route>
);

function render() {
  run(routes, (Handler) => React.render(<Handler/>, document.body));
}

render();
structure.on("swap", render);
