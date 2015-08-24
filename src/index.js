import * as React from 'react';
import { run, DefaultRoute, Route, RouteHandler } from "react-router";

import * as data from './data';

import ChatPage from './chat';

//require("./static/css/ratchet");
require('./static/css/styles.css');

class Main extends React.Component {
  render() { return (<RouteHandler/>); }
}

function requireAuth(nextState, redirectTo) {
  //if(!data.user) redirectTo('/join', null, {nextPathname: nextState.location.pathname});
  //if ()
}

const routes = (
  <Route name='main' path='/' handler={Main}>
    <Route name='chat' path='/chat/:chatId' handler={ChatPage} onEnter={requireAuth}/>
  </Route>
);

run(routes, (Handler) => React.render(<Handler/>, document.body));

