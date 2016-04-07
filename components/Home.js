import React from 'react'
import style from '../styles/index'
import MainContainer from './MainContainer'

import { Link } from 'react-router'

export default React.createClass({

  render() {
    return (
     <MainContainer>
        <h1>Welcome</h1>
        <p className="lead">
          You can select people and see who selected you!  
          If You click on person name you get to see more details
          and you can serach through the list in real time 
        </p>

        <Link to="/topview">
          <button
            className="btn btn-lg btn-success">Next</button>
        </Link>
      </MainContainer>
    )
  }
}) 