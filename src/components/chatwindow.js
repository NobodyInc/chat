import * as React from 'react';
import { Tween, Easing, update } from 'tween.js';
import Bubble from './bubble.js';

let { PropTypes, Component } = React;

const updateInterval = 40;
const scrollDuration = 250;

export default class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.scrollTop = 0;
  }

  componentDidUpdate() {
    const node = this.refs.convo.getDOMNode();
    const newScrollTop = node.scrollHeight - node.offsetHeight;

    setInterval(() => { update(Date().now); }, updateInterval);

    new Tween({scrollTop: this.scrollTop})
      .to({scrollTop: newScrollTop}, scrollDuration)
      .easing(Easing.Quadratic.Out)
      .onUpdate(function() { node.scrollTop = this.scrollTop; })
      .start();

    this.scrollTop = newScrollTop;
  }

  render() {
    let { feed, isSelf } = this.props;

    return (
      <div ref='convo' className='feed'> {
        this.props.feed.map(message => (

          isSelf(message) ? <Bubble type='sent' content={message.text}/>
                          : <Bubble type='received' content={message.text}/>

        ))
      } </div>
    );
  }
}

ChatWindow.propTypes = {
  isSelf: PropTypes.func,
};

ChatWindow.propTypes = {
  isSelf: () => true,
};
