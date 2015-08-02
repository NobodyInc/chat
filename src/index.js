import * as React from "react";
import { default as immstruct } from "immstruct";
import { default as component } from "omniscient";

let structure = immstruct({message: "Hi!"});

let AppComponent = component(({cursor}) => {
  return <div className="container-fluid">{cursor.get("message")}</div>
});

const App = AppComponent.jsx;

function render() {
  React.render(<App cursor={structure.cursor()}/>, document.body);
}

render();
structure.on("swap", render);
