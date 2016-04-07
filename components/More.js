import React from 'react'
const PropTypes = React.PropTypes
import styles from '../styles'
import UserDetailsWrapper from '../components/UserWrapper'
import UserDetails from '../components/UserDetails'
import MainContainer from '../components/MainContainer'

import {Link} from 'react-router'


function puke(obj) {
  return <pre>{JSON.stringify(obj, 2, " ") }</pre>
}

function StartOver(props) {
  return (<div className="col-sm-12" style={styles.space}>
    <Link to="/PlayerOne">
      <button type="button" className="btn btn-lg btn-danger">
        Start Over
      </button>
    </Link>
  </div>)
}

function Result(props) {
  return (
    <MainContainer header="Details">
      <UserDetailsWrapper>
        <UserDetails info={props.location.state.playerInfo}>
        </UserDetails>
      </UserDetailsWrapper>
    </MainContainer>
  )
}


Result.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  playersInfo: PropTypes.array.isRequired,
  scores: PropTypes.array
}
export default Result
