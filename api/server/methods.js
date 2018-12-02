import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import {Accounts} from 'meteor/accounts-base';
import  {ServiceConfiguration} from 'meteor/service-configuration';

import { Bids, Products, Events, Brands } from '../collections.js';


Accounts.onCreateUser(function (options, user) {
    if (user.services.google) {

      user.firstname = user.services.google.given_name;
      user.lastname = user.services.google.family_name;
      user.email = user.services.google.email;
      return user;

    } else if (user.services.facebook){

      user.firstname = user.services.facebook.first_name;
      user.lastname = user.services.facebook.last_name;
      user.email = user.services.facebook.email;
      return user;

    } else {
      user.firstname = options.profile.firstname;
      user.lastname = options.profile.lastname;
      user.email = options.email;
      return user;
    }
});

Meteor.methods({

  'signin'(data) {

    check(data, {
      firstname: String,
      lastname: String,
      email: String,
      password: String
    });
    
    if (data.firstname=="" || data.lastname=="" || data.email=="" || data.password=="") {
      throw new Meteor.Error("filds-empty", "We need your credential before starting!");

    } else if (data.email.includes("yopmail") || data.email.includes("Yopmail")){
      throw new Meteor.Error("password", "No yopmail, please!");

    } else if (data.password.length < 4){
      throw new Meteor.Error("password", "Password must contains 4 or more digit!");

    } else {
      Accounts.createUser({
        email: data.email,
        profile: {firstname: data.firstname, lastname: data.lastname},
        password: data.password
      });
    }
  },
	
	'sendBid'(data) {

		check(data, {
      itemID: String,
      eventID: String, 
      itemPrice: Number
		});
    
    if (data.itemID =="" || data.eventID =="" || data.itemPrice == "") {
      throw new Meteor.Error("message-empty", "sendBid something went wrong!");
    } else {

      Bids.insert({
        event_ID: data.eventID,
        firstname: Meteor.user().firstname,
        lastname: Meteor.user().lastname,
        email: Meteor.user().email,
        itemID: data.itemID,
        itemPrice: data.itemPrice,
        createdAt: new Date()
      });

      Events.update( data.itemID , { $set: { buyAt: Date.now() } });
    }
	}, 

  //admin function
  'startBid'(eventid){
    
    const eventid_exist = Events.find({_id: eventid}).count();

    if (eventid_exist < 1 ) {
      throw new Meteor.Error("WRONG", "EventID don't exist");
    } else {
      const res = Events.update( eventid , { $set: { bidAt: Date.now(), buyAt: null }});
    }
  },

  'resetBid'(eventid){

    const eventid_exist = Events.find({_id: eventid}).count();

    if (eventid_exist < 1 ) {
      throw new Meteor.Error("WRONG", "EventID don't exist");
    } else {
      const res = Events.update( eventid , { $set: { bidAt: null, buyAt: 1 }});
    }
  },

  'createevent'(data) {

    check(data, {
      eventName: String,
      eventLocation: String, 
      eventDate: Date,
      eventTime: String,
      productName: String,
      productPrice: Number,
      productImg: String,
    });
    
    if (data.eventName =="" || data.eventLocation =="" || data.eventDate == "" || data.eventTime == "" || data.productName == "" || data.productPrice == "" || data.productImg == "") {
      throw new Meteor.Error("message-empty", "createevent something went wrong!");
    } else {

      Events.insert({
        product_ID: Math.random().toString(10).substring(7), 
        event_name: data.eventName, 
        event_location: data.eventLocation,
        event_date: data.eventDate, 
        event_time: data.eventTime,
        product_name: data.productName,
        product_initialPrice: data.productPrice,
        product_img: data.productImg,
        winner_name: null, 
        winner_price: null, 
        bid_time: null, 
        bidstart: null,
        launchedAt: null, 
        finishedAt: null,
        createdAt: new Date(), 
        bidAt: null, 
        buyAt: 1
      });
    }
  }, 

  'deleteevent'(eventid){

    const eventid_exist = Events.find({_id: eventid}).count();

    if (eventid_exist < 1 ) {
      throw new Meteor.Error("WRONG", "EventID don't exist");
    } else {
      const res = Events.remove({_id: eventid});
    }
  }
  
});

