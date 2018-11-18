import { Meteor } from 'meteor/meteor';
import { Items, Events } from '../api/collections.js';

Meteor.startup(() => {
  // Items.insert({
  //       name: "Google Home MINI",
	 //  	image: 1,
	 //  	initialPrice: 45, 
	 //  	bidAt: null,
	 //  	buyAt: 1,
	 //  	createdAt: new Date()
  //     });

	Events.insert({
	  	productID: "j", 
	    event_name: "j", 
	  	event_location: "j", 
	  	event_time: "j",
	  	product_name: "j",
	  	product_initialPrice: "j",
	    winner_name: "j", 
	    winner_price: "j", 
	    bid_time: "j", 
	    bidstart: "j",
	    launchedAt: "j", 
	    finishedAt: "j",
	    createdAt: "j"
  	});
});

