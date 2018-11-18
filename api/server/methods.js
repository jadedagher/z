import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Bids, Products, Events, Brands } from '../collections.js';


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
    
    if (data.itemID =="" || data.eventID =="" || data.itemPrice == null) {
      throw new Meteor.Error("message-empty", "something went wrong!");
    } else {

      Bids.insert({
        event_ID: data.eventID,
        firstname: Meteor.user().profile.firstname,
        lastname: Meteor.user().profile.lastname,
        email: Meteor.user().emails[0].address,
        itemID: data.itemID,
        itemPrice: data.itemPrice,
        createdAt: new Date()
      });

      Events.update( data.itemID , { $set: { buyAt: Date.now() } });
    }
	}, 

  //admin function
  'startBid'(eventid){
      const res = Events.update( eventid , { $set: { bidAt: Date.now(), buyAt: null }});
  }

  //refaire le dashboard 

  // 'resetBid'(){
  //     const res = Items.rawCollection().drop();
  // },

  // 'test_populateitemdb'(){
  //     Items.insert({
  //       name: "Google Home MINI",
  //       image: 1,
  //       initialPrice: 45, 
  //       bidAt: null,
  //       buyAt: 1,
  //       createdAt: new Date()
  //     });
  // },

  // 'populateitemdb'(data){

  //   check(data, {
  //     itemname: String,
  //     itemprice: Number
  //   });

  //   if (data.itemname =="" || data.itemprice == null) {
  //     throw new Meteor.Error("message-empty", "fill the fields");
  //   } else {

  //     Items.insert({
  //       name: data.itemname,
  //       image: 1,
  //       initialPrice: data.itemprice, 
  //       bidAt: null,
  //       buyAt: 1,
  //       createdAt: new Date()
  //     });
  //   }
  // }
});

