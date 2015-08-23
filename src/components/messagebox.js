import * as React from 'react';

let { PropTypes, Component } = React;


function handler(active) {
  console.log('active', active);
}

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
    let {active, timer, props: {timeout}} = this;
    if (!this.active) handler(true);
    if (timeout) clearTimeout(this.active);
    this.active = setTimeout(() => handler(this.active = false), timeout);
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
  onStatus: PropTypes.func
};

MessageBox.defaultProps = {
  handleMsg: () => {},
  timeout: 2000
};
