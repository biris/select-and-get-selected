import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Students} from '../imports/api/Students'


ServiceConfiguration.configurations.upsert({service: 'github'}, {
  $set: {
    clientId: '42de5452690e796da3cc',
    secret: '2be3470f3386c800c71495ae06b2902cf277e0bf',
    loginStyle: 'redirect'
  }
});

function getUserInfo(accessToken) {
  let result = HTTP.get("https://api.github.com/user", {
    headers: {
      'User-Agent': 'Meteor'
    },

    params: {
      access_token: accessToken
    }
  });

  return _.pick(result.data, 'login', 'email');
}

// Accounts.onCreateUser((options, user) => {
//
//   return user;
// });

Accounts.onLogin((loginInfo) => {
  let user = loginInfo.user;
  let accessToken = user.services.github.accessToken;
  let userInfo = getUserInfo(accessToken);
  Meteor.users.update({_id: user._id}, {
    $set: {
      profile: userInfo,
      login: userInfo.login,
      email: userInfo.email
    }
  });
});

Accounts.onCreateUser(function (options, user) {

  let newStudent = {id: user._id, username: user.services.github.username, selected: []}

  // console.log(newStudent)

  Students.insert(newStudent)

  // console.log("A LOGIN", newStudent)
  user.profile = getUserInfo(user.services.github.accessToken);
  user.login = user.profile.login;
  user.email = user.profile.email;

  return user;
});

Meteor.publish('user', function () {
  return Meteor.users.find({_id: this.userId}, {fields: {_id: 1, profile: 1, login: 1, email: 1}});
});


const initData = [
  {
    username: 'aaronc',
    selected: ['cgrand', 'fogus', "acs3909"]
  },
  {
    username: 'cgrand',
    selected: ['nickmbaile', 'fogus', "acs3909"]
  },
  {
    username: 'fogus',
    selected: ['EricThorsen', "acs3909"]
  },
  {
    username: 'nickmbaile',
    selected: ['EricThorsen', 'biris']
  },
  {
    username: 'EricThorsen',
    selected: []
  },
  {
    username: 'biris',
    selected: ["acs3909"]
  },
  {
    username: 'bbatsov',
    selected: ["acs3909", "biris"]
  }
]

if (Students.find({}).count() < 3) {
  initData.forEach((user) => {
    Students.insert(user);
  })
}

