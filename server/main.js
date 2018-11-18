import { Meteor } from 'meteor/meteor';
import { Items, Events } from '../api/collections.js';

Meteor.startup(() => {

	Events.insert({
	  	product_ID: "xx", 
	    event_name: "la super event", 
	  	event_location: "au liban", 
	  	event_time: "09/09/1900",
	  	product_name: "pirogue",
	  	product_initialPrice: 165,
	    winner_name: null, 
	    winner_price: null, 
	    bid_time: null, 
	    bidstart: null,
	    launchedAt: null, 
	    finishedAt: null,
	    bidAt: null,
    	buyAt: 1,
	    createdAt: new Date()
  	});

  	Events.insert({
	  	product_ID: "cc", 
	    event_name: "turing racer", 
	  	event_location: "à paris", 
	  	event_time: "01/02/1300",
	  	product_name: "voiture",
	  	product_initialPrice: 191,
	    winner_name: null, 
	    winner_price: null, 
	    bid_time: null, 
	    bidstart: null,
	    launchedAt: null, 
	    finishedAt: null,
	    bidAt: null,
    	buyAt: 1,
	    createdAt: new Date()
  	});

});

