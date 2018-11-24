import { Template } from 'meteor/templating';
import { Cookies } from 'meteor/mrt:cookies';
import d3 from 'd3';

import { Events } from '../../../api/collections.js';

import '../html/eventlist.html';


Template.home.onCreated(function bodyOnCreated() {
	
	this.eventSub = this.subscribe("events"); //get events

});

Template.home.helpers({
	event_today_list(){
		return Events.find({"event_time" : {"$eq": new Date()}});
	},

	event_incoming_list(){
		return Events.find({"event_time" : {"$gte": new Date()}});
	},

	event_past_list(){
		return Events.find({"event_time" : {"$lte": new Date()}});
	}
});

Template.home.events({

	'submit .eventselection'(event){
	 	event.preventDefault();
	 	const $el = $(event.currentTarget);
	 	const eventID = $el.find('.eventID').val();
	 	FlowRouter.go('bid', {id: eventID});
  	}
 
});