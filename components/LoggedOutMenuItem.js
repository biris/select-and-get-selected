import React from 'react'


export default React.createClass({
  propTypes: {
    onLogin: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <li className="active">
        <a href onClick={this.props.onLogin}>
          Login with Github
        </a>
      </li>
    );
  }
});
