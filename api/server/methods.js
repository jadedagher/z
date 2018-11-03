import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Bids, Items } from '../collections.js';


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
      itemPrice: String, //the message to send
      name: Match.Optional(String) //if the user already has a name
		});
    
    if (data.itemID=="" || data.itemPrice=="") {
      throw new Meteor.Error("message-empty", "something went wrong!");
    } else {

      Bids.insert({
        firstname: Meteor.user().profile.firstname,
        lastname: Meteor.user().profile.lastname,
        email: Meteor.user().emails[0].address,
        itemID: data.itemID,
        itemPrice: data.itemPrice,
        createdAt: new Date()
      });

      Items.update( data.itemID , { $set: { buyAt: Date.now() } });
    }
	}, 

  'startBid'(itemID){
      const res = Items.update( itemID , { $set: { bidAt: Date.now(), buyAt: null }});
  },

  // 'getServerTime'() {
  //   var date = new Date();
  //   date.setTime(date.getTime());
  //   return date;
  // }

});

