import { Mongo } from 'meteor/mongo';

//declare the Mongo collections to use

export const Bids = new Mongo.Collection('bids');
export const Products = new Mongo.Collection('products');
export const Events = new Mongo.Collection('events');
export const Brands = new Mongo.Collection('brands');
export const Credentials = new Mongo.Collection('credentials');
export const Subscription = new Mongo.Collection('subscription');


