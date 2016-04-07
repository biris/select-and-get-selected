import React from 'react'
import style from '../styles/index'
import {Link} from 'react-router'
import githubHelpers from '../utils/githubHelpers'
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider'
import RaisedButton from 'material-ui/lib/raised-button';
import Avatar from 'material-ui/lib/avatar'
import LinearProgress from 'material-ui/lib/linear-progress';


const LinearProgressExampleSimple = () => (
  <LinearProgress mode="indeterminate"/>
);



export default React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  
  
  PropTypes: {
    username: React.PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      isLoading: true,
      playerInfo: {},
    }
  },

  componentDidMount() {
    githubHelpers.getUserInfo(this.props.username)
      .then((data) => {
        this.setState({
          isLoading: false,
          playerInfo: data
        })

      })
  },

  onChecked(e) {
    console.log("selected") //TODO update the database to be selected

    this.props.onSelect(this.state.playerInfo._id)

  },


  onSelected(e) {
    this.setState({
      selected: !this.state.selected
    })
  },

  gotoPlayer() {
    this.context.router.push({
      pathname: '/more',
      state: {
       playerInfo: this.state.playerInfo
      }
    })
  },

  render() {
    if (this.props.isLoggedIn) {
        return <Home/>
      } else {
      return (
        this.state.isLoading == true ?
          <LinearProgressExampleSimple/>
          :
          <div>
            <ListItem
              primaryText={<Link to={{pathname: "/more", state: {playerInfo: this.state.playerInfo}}}>
            <RaisedButton label={this.props.username} style={style} backgroundColor={'grey'}/></Link>}
              rightAvatar={ <Avatar src={Object.keys(this.state.playerInfo).length === 0 ? '' :this.state.playerInfo.avatar_url}/>}
              style={{backgroundColor: '#696969'}}
              onClick={this.gotoPlayer}
            />
            <div style={{height: '3px'}}></div>
            <Divider/>
          </div>

    )}
  }})


