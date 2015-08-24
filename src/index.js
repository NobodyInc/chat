import * as React from 'react';
import { run, DefaultRoute, Route, RouteHandler } from "react-router";

import {
  Join,
} from './components';

import ChatPage from './chat';


//require("./static/css/ratchet");
require('./static/css/styles.css');

//class Main extends React.Component {
//  handleSubmit() {
//    console.log('submitted');
//  }
//
//  render() {
//    return (<form onSubmit={this.handleSubmit.bind(this)}>
//      <input type='text' placeholder='Title'/>
//      <button className='btn btn-positive btn-block'>Create</button>
//    </form>);
//  }
//}

class Main extends React.Component {
  render() {
    return (<div><RouteHandler/></div>);
  }
}

function requireAuth(nextState, redirectTo) {
  //if(!auth.loggedIn()) redirecTo('/join', null, {});
}

const routes = (
  <Route name='main' path='/' handler={Main}>
    <Route name='chat' path='/chat/:chatId' handler={ChatPage} onEnter={requireAuth}/>
    <Route name='join' path='/join' handler={Join}/>
  </Route>
);

// get back object -. user = {id: 90309, token: 302f0390f}
run(routes, (Handler) => React.render(<Handler/>, document.body));

