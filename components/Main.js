import React from 'react'
import {Link} from 'react-router'
import { Meteor } from 'meteor/meteor'
import AccountsUIWrapper from '../components/AccountsUIWrapper'
import NavMenu from '../components/NavMenu'



export default React.createClass({

  render() {
    return (
      <div className="main-container">
        <NavMenu/>
        {this.props.children}
      </div>
    )
  }
}) 