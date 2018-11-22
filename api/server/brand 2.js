 import { Meteor } from 'meteor/meteor';
 import { Brands } from '../collections.js';

 Meteor.publish("brands", function() {
   return Brands.find({}, {
   fields: {
     brand_ID: 1,
    brand_name: 1,
     brand_category: 1,
    brand_size: 1,
    createdAt: 1
   }
   });

 });