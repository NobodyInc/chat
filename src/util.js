import * as React from "react";

export function mapObject(obj, fns) {
  return Object.keys(obj).filter((k) => obj.hasOwnProperty(k)).reduce((prev, k) => {
    let val = obj[k], fn = fns[k];
    prev[k] = fn? fn(val) : val;
    return prev;
  }, {});
}

//work around react-router
export function wrapper(Component, handlers) {
  return React.createClass({
    render: function() {
      return React.createElement(Component, mapObject(this.props.params, handlers));
    }
  });
}

