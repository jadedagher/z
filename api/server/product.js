import { Meteor } from 'meteor/meteor';
import { Products } from '../collections.js';

Meteor.publish("products", function() {
  return Products.find({}, { 
  fields: { 
  	brand_ID: 1,
  	brand_name: 1,
  	product_name: 1,
    product_img: 1, 
  	product_category: 1, 
  	product_initialPrice: 1,
    product_description: 1,
    product_quantity: 1, 
  	createdAt: 1
  }
  }); 
});