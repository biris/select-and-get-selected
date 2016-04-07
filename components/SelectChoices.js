import React from 'react'

import style from '../styles/index'


import ReactRouter from 'react-router'
import { Link } from 'react-router'

import UserRow from '../components/UserRow'
import List from 'material-ui/lib/lists/list';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';

function wrapState(ComposedComponent) {
  const StateWrapper = React.createClass({
    getInitialState() {
      return {selectedIndex: 1};
    },
    handleUpdateSelectedIndex(e, index) {
      this.setState({
        selectedIndex: index,
      });
    },
    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          valueLink={{value: this.state.selectedIndex, requestChange: this.handleUpdateSelectedIndex}}
        />
      );
    },
  });
  return StateWrapper;
}

SelectableList = wrapState(SelectableList);

let SelectableList = SelectableContainerEnhance(List);




export default React.createClass({



  
  getSelected(username) {
    return this.props.selected.includes(username)
  },


  handlePress(username) {
    // TODO update the db of current user

  },

  handleSelect(id) {
    console.log("selected!")

  },

  getRows() {
    return this.props.users.filter((e) => {
      return  e.username.includes(this.props.filterValue)
    }).map((user) => {
      return <UserRow
        username={user.username}
        key={user._id}
        selected={this.getSelected(user.username)}
      />
    })
  },

  render() {
    return(
    <SelectableList>
      {this.getRows()}
    </SelectableList>)
  }
})

