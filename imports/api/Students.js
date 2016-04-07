import { Mongo } from 'meteor/mongo';



export const Students = new Mongo.Collection('students');

if (Meteor.isServer) {
  Meteor.publish('students', function studentsPublication() {
    return Students.find();
  })


  Meteor.methods({

    'select.update'(username, selected) {
      var currUser = Meteor.user().services.github.username
        // Meteor.user().services.username
      console.log(Meteor.userId)

      if (!selected) {
        Students.update({username: currUser},
          {
            $addToSet: {selected: username}
          })
      } else {
        Students.update({username: currUser}, {$pull: {selected: username}})
      }

    }
  })
}