import * as React from 'react/addons';
import * as data from './data';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

import {
  MessageBox,
  ChatWindow,
  typingUsers,
} from './components';

export default class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {feed: [], users: {}, user: null}
    this.chatId = this.props.params.chatId;
  }

  handleMessage(value) {
    data.sendMessage(this.userId, value);
  }

  componentDidMount() {
    this.setState({user: data.user});
    data.listen('message', feed => this.setState({feed}));
  }

  handleStatus(active) {
    //socket.emit('status', {who: userId, active});
  }

  handleSubmit() {
    this.setState({user: data.user = this.refs.sn.getDOMNode()});
  }

  render() {
    return (<div>
      { data.user ? null :
        <ReactCSSTransitionGroup transitionName='sn-form' transitionAppear={true}>
          <form id='screenname' onSubmit={this.handleSubmit.bind(this)}>
            <input ref='sn' type='text' placeholder='Screen Name'/>
            <button className='btn btn-positive btn-block'>Ok</button>
          </form>
        </ReactCSSTransitionGroup>
      }
      <header className='bar bar-nav'>
        <h1 className='title'>Messages</h1>
      </header>
      <div className='content content-padded'>
        <ChatWindow
          isSelf={m => m.who === this.userId}
          feed={this.state.feed}
        />
        <p> { typingUsers } </p>
        <footer>
          <hr/>
          <MessageBox
            placeholder={'Say something nice...'}
            handleMsg={this.handleMessage.bind(this)}
            handleStatus={this.handleStatus.bind(this)}
          />
        </footer>
      </div>
    </div>);
  }
}
