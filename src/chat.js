import * as React from 'react/addons';
import { socket } from './data';
import { MessageBox, ChatWindow, typingUsers, } from './components';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {feed: [], users: {}, user: null};
    this.chatId = this.props.params.chatId;
  }

  handleMessage(value) {
    socket.emit('send', {who: this.state.user, text: value});
  }

  componentDidMount() {
    socket.on('message', feed => this.setState({feed}));
  }

  handleStatus(active) {
    //socket.emit('status', {who: userId, active});
  }

  handleSubmit() {
    this.setState({user: this.refs.sn.getDOMNode().value});
  }

  render() {
    return (
      <div>
        {
          this.state.user ? null :
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
            isSelf={message => message.who === this.state.user}
            feed={this.state.feed}
          />
          <p> { typingUsers } </p>
        </div>

        <footer className={'messagebox'}>
          <MessageBox
            placeholder={'Say something nice...'}
            handleMsg={this.handleMessage.bind(this)}
            handleStatus={this.handleStatus.bind(this)}
          />
        </footer>

      </div>
    );
  }
}
