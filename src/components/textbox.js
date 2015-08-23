import * as React from 'react';

let { PropTypes, Component } = React;

const config = {
  13: (buf, val, fn) => fn(buf),
  default: (buf, val) => buf + String.fromCharCode(val)
}

export default class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {buffer:""};
  }

  handleKeyPress(e) {
    const val = e.which;
    const handler = config[val];
    const next = (handler? handler : config.default)(this.state.buffer, val, this.props.handleMsg || () => {});
    this.setState({buffer: next || ""});
  }

  render() {
    return (
      <div className='row'>
        <div className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2'>
          <div className='input-group input-group-lg'>
            <span className='input-group-addon' id="sizing-addon1">@</span>
            <input
                   type='text'
                   className='form-control'
                   placeholder='Message'
                   aria-describedby='sizing-addon1'
                   onKeyPress={this.handleKeyPress.bind(this)}
                   value={this.state.buffer}
            />
          </div>
        </div>
      </div>
    )
  }
}

TextBox.propTypes = {handleMsg: PropTypes.func};
