import * as React from 'react';

let { PropTypes, Component } = React;

export default class MessageBox extends Component {
  handleSubmit() {
    const node = this.refs.inputText.getDOMNode();
    this.props.handleMsg(node.value);
    node.value = "";
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          ref='inputText'
          type='text'
          placeholder={this.props.placeholder}
        />
        <button
          type='submit'
          className='btn btn-positive btn-block'
        >
          Send
        </button>
      </form>
    );
  }
}

MessageBox.propTypes = {
  handleMsg: PropTypes.func,
  placeholder: PropTypes.string
};

MessageBox.defaultProps = {
  handleMsg: () => {}
};
