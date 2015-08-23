import * as React from 'react';

let { PropTypes, Component } = React;

export default class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.active = false;
  }

  handleSubmit() {
    const node = this.refs.inputText.getDOMNode();
    this.props.handleMsg(node.value);
    node.value = "";
  }

  handleChange() {
    let { active, props: { timeout, handleStatus } } = this;
    if (!this.active) handleStatus(true);
    if (timeout) clearTimeout(this.active);
    this.active = setTimeout(() => handleStatus(this.active = false), timeout);
  }

  render() {
    return (<form onSubmit={this.handleSubmit.bind(this)}>
      <input
        ref='inputText'
        type='text'
        placeholder={this.props.placeholder}
        onChange= {this.handleChange.bind(this)}
      />
      <button
        type='submit'
        className='btn btn-positive btn-block'
      >
        Send
      </button>
    </form>);
  }
}

MessageBox.propTypes = {
  handleMsg: PropTypes.func,
  placeholder: PropTypes.string,
  timeout: PropTypes.number,
  handleStatus: PropTypes.func
};

MessageBox.defaultProps = {
  handleMsg: () => {},
  handleStatus: () => {},
  timeout: 2000
};
