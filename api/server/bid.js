import { Meteor } from 'meteor/meteor';
import { Bids } from '../collections.js';

Meteor.publish("bids", function() {
  return Bids.find({}, { 
  fields: {
    user_ID: 1, 
    event_ID: 1,
  	firstname: 1, 
    lastname: 1, 
  	email: 1, 
  	itemID: 1,
  	itemPrice: 1,
  	createdAt: 1
  }
  });

});