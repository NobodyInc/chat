import * as React from 'react';
import cx from 'classnames';

let { PropTypes, Component } = React;

export default class ChatWindow extends Component {
  render() {
    let { feed, isSelf } = this.props;

    return (<div className="convo"> {
        this.props.feed.map(m => (
          <div className={cx({"msg": true, "msg-out": isSelf(m)})}>
            <div className="bubble">
              <p>{m.message}</p>
            </div>
          </div>
        ))
    } </div>);
  }
}

