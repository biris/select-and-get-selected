import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
    console.log("DID MOUNT")
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
    console.log("UNOMOUT")
  }
  render() {
    
    return <span onClick={console.log("clicked")} ref="container" />;
  }
}

