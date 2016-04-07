/**
 * Created by owner_ on 2016-03-23.
 */
import React from 'react'
const PropTypes = React.PropTypes
import styles from '../styles'


function MainContainer(props) {
  return (
    <div className="jumbotron col-sm-12 text-center" style={styles.transparentBg}>
      <h1>{props.header}</h1>
      <div className="col-sm-8 col-sm-offset-2">
        {props.children}
      </div>
    </div>)
}

MainContainer.PropTypes = {
  header : PropTypes.string.isRequired
}

export default MainContainer