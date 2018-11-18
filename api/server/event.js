import { Meteor } from 'meteor/meteor';
import { Events } from '../collections.js';

Meteor.publish("events", function() {
  return Events.find({}, { 
  fields: { 
  	product_ID: 1, 
    event_name: 1, 
  	event_location: 1, 
  	event_time: 1,
  	product_name: 1,
  	product_initialPrice: 1,
    winner_name: 1, 
    winner_price: 1, 
    bid_time: 1, 
    bidstart: 1,
    launchedAt: 1, 
    finishedAt: 1,
    createdAt: 1, 

    bidAt: 1, 
    buyAt: 1

  }
  });
});