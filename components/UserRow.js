import React, { Component, PropTypes } from 'react';
import style from '../styles/index'
import {Link} from 'react-router'
import githubHelpers from '../utils/githubHelpers'
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider'
import RaisedButton from 'material-ui/lib/raised-button';
import Avatar from 'material-ui/lib/avatar'
import LinearProgress from 'material-ui/lib/linear-progress';
import { Meteor } from 'meteor/meteor';



const LinearProgressExampleSimple = () => (
  <LinearProgress mode="indeterminate"/>
);

export default class UserRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      playerInfo: {},
      selected: this.props.selected
    }


  }

  componentDidMount() {
    githubHelpers.getUserInfo(this.props.username)
      .then((data) => {
        this.setState({
          isLoading: false,
          playerInfo: data
        })

      })
  }

  onChecked(e) {
    this.props.onSelect(this.state.playerInfo._id)
  }


  onSelected(e) {
    // TODO ADD METHODS and SECURE

    // var currUser = Meteor.user().services.github.username
    console.log("selected", this.state)

    this.setState({
      selected: !this.state.selected
    })

    Meteor.call('select.update', this.props.username, this.props.selected);
    
  }




  render() {
    return (
      this.state.isLoading == true ?
        <LinearProgressExampleSimple/>
        : <div>
        <ListItem
          primaryText={
            <Link to={{pathname: "/more", state: {playerInfo: this.state.playerInfo}}}>
            <RaisedButton label={this.props.username} style={style} backgroundColor={this.props.selected ? 'green' : 'red'}/>
          </Link>}

          rightAvatar={ <Avatar src={Object.keys(this.state.playerInfo).length === 0 ? '' :this.state.playerInfo.avatar_url}/>}
          style={{backgroundColor: this.props.selected ? '#006400' : 'DarkRed '}}
          onClick={this.onSelected.bind(this)}
        />
        <div style={{height: '3px'}}></div>
        <Divider/>
      </div>


    )
  }
}



UserRow.PropTypes = {
  username: React.PropTypes.string.isRequired,
  selected: React.PropTypes.string.isRequired
}




