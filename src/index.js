import * as React from 'react';
import * as Router from 'react-router';
import { run, DefaultRoute, Route, RouteHandler } from "react-router";

import TextBox from './components/textbox';

require("bootstrap-webpack");
require("./static/css/styles.css");

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <TextBox handleMsg={(value) => console.log('value', value)}/>
      </div>
    );
  }
}

//<Route name="home" handler={Home}/>
const routes = (
  <Route name="app" path="/" handler={App}>
  </Route>
);

//React.render(<App/>, document.body);
run(routes, (Handler) => React.render(<Handler/>, document.body));
