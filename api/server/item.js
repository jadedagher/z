import { Meteor } from 'meteor/meteor';
import { Items } from '../collections.js';

Meteor.publish("items", function() {
  return Items.find({}, { 
  fields: { 
  	name: 1,
  	image: 1,
  	initialPrice: 1, 
  	bidAt: 1, 
  	buyAt: 1,
  }
  }); 
});