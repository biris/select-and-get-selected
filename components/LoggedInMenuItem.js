import React from 'react'

import reactMixin from 'react-mixin';

export default React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    };
  },

  propTypes: {
    onLogout: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <li className="dropdown">
        <a
          href
          className="dropdown-toggle"
          data-toggle="dropdown">
          {this.data.currentUser.login} <span className="caret"></span>
        </a>
        <ul className="dropdown-menu">
          <li>
            <a href="" onClick={this.props.onLogout}>Logout</a>
          </li>
        </ul>
      </li>
    );
  }
});
