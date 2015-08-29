import * as React from 'react';
import cx from 'classnames';

let { PropTypes, Component } = React;

export default class Bubble extends Component {
  constructor(props) {
    super(props);
    this.classes = cx({
      'msg': true,
      'msg-out': this.props.type === 'sent' ? 'msg-out' : null,
    });
  }

  render() {
    return (
      <div className={ this.classes }>

        <div className='bubble'>
          <p>{this.props.content}</p>
        </div>

        { this.props.type === 'received' ? <span className='avatar'/> : null }

      </div>
    );
  }
}

Bubble.propTypes = {
  content: PropTypes.string,
  type: PropTypes.string,
};
