import React from 'react'
import {Route, IndexRoute, hashHistory, Router} from 'react-router'

import More from '../components/More'

import Main from '../components/Main'
import Home from '../components/Home'

import TopView from '../containers/TopView'




export default  (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home}/>
      <Route path="/topview" component={TopView}></Route>
      <Route path="/more" component={More}></Route>
    </Route>
  </Router>
)



