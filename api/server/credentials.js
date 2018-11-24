import { Meteor } from 'meteor/meteor';
import { Credentials } from '../collections.js';

Meteor.publish("credentials", function() {
  return Credentials.find({}, { 
  fields: { 
  	service: 1,
  	appId: 1, 
  	secret: 1
  }
  });

});