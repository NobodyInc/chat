import * as React from 'react';
import cx from 'classnames';
import { Tween, Easing, update} from "tween.js";

let { PropTypes, Component } = React;

const updateInterval = 40;
const scrollDuration = 250;

export default class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.scrollTop = 0;
  }

  componentDidUpdate() {
    const node = this.refs.convo.getDOMNode(),
          newScrollTop = node.scrollHeight - node.offsetHeight;

    setInterval(() => {update(Date().now)}, updateInterval);

    new Tween({scrollTop: this.scrollTop})
      .to({scrollTop: newScrollTop + 20}, scrollDuration)
      .easing(Easing.Quadratic.Out)
      .onUpdate(function() { node.scrollTop = this.scrollTop; })
      .start();

    this.scrollTop = newScrollTop;
  }

  render() {
    let { feed, isSelf } = this.props;

    return (<div ref="convo" className="convo"> {
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
