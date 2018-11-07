import { Mongo } from 'meteor/mongo';

//declare the Mongo collections to use

export const Bids = new Mongo.Collection('bids');
export const Items = new Mongo.Collection('items');

