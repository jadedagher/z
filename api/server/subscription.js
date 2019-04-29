import { Meteor } from 'meteor/meteor';
import { Subscription } from '../collections.js';

Meteor.publish("subscription", function() {
  return Subscription.find({}, { 
  fields: {
    user_ID: 1,
    event_ID: 1,
  	firstname: 1, 
    lastname: 1, 
  	email: 1, 
  	createdAt: 1
  }
  });

});