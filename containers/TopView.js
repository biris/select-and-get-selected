import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import SelectedResult from '../components/SelectedResult'
import SelectChoices from '../components/SelectChoices'
import MainContainer from '../components/MainContainer'
import TextFilter from '../components/TextFilter'
import {Students} from '../imports/api/Students'
import { Meteor } from 'meteor/meteor';
import Subheader from 'material-ui/lib/Subheader/Subheader'

import {composeWithTracker} from 'react-komposer';

const TopView = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      loginState: !!Meteor.user()
    };
  },

  getInitialState() {
    return {
      filterValue: ''
    }
  },

  handleFilter(value) {
    this.setState({
      filterValue: value
    })
  }, 

  
  render() {
    if (this.data.loginState) {
      return (

        <MainContainer header="So far... ">
          <TextFilter onInputChanges={this.handleFilter} />
          <h4>
            To select from
          </h4>
          <SelectChoices loggedIn={this.props.loggedIn} filterValue={this.state.filterValue} users={this.props.users} selected={this.props.selected}/>
          <h4>
            Who selected you
          </h4>
          <SelectedResult users={this.props.whoSelected}/>
        </MainContainer>
      )
    } else {
      return <MainContainer header="Please login :)">

      </MainContainer>
    }

  }
})

export default createContainer(() => {

  Meteor.subscribe('students');

  const currUser = Students.findOne({id : Meteor.userId()})['username']
  const loggedIn = !!currUser


  return {
    users: Students.find({username: {$ne: currUser}}).fetch(),
    selected: Students.findOne( { username: currUser })['selected'],
    whoSelected: Students.find({selected: {$in : [currUser]}}).fetch(),
    loggedIn: {loggedIn}
  };
}, TopView);

