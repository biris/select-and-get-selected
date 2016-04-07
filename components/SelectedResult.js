import React from 'react'

import style from '../styles/index'

import UserRowResult from '../components/UserRowResult'

import ReactRouter from 'react-router'
import { Link } from 'react-router'


import List from 'material-ui/lib/lists/list';


export default React.createClass({

  getSelected() {
    return true // TODO add some logic here
  },

  handleSelect(id) {
    console.log("selected!")

  },

  getRows() {
    return this.props.users.map((user) =>
    {
      return <UserRowResult username={user.username} key={user._id}/>
    })
  },

  render() {
    return (
      <List>
        {this.getRows()}
      </List>)
  }
})

