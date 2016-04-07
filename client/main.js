/**
 * Created by owner_ on 2016-04-04.
 */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import ReactDom from 'react-dom';
import routes from '../config/routes'


import {Students} from '../imports/api/Students'
import TopView from '../containers/TopView'



if (Meteor.isClient) {
  Meteor.subscribe('students');
  Meteor.subscribe('user');
  
  
  Meteor.startup(() => {
    ReactDom.render(routes, document.getElementById('app'));
  })

}