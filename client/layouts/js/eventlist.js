import { Template } from 'meteor/templating';
import { Cookies } from 'meteor/mrt:cookies';
import d3 from 'd3';

import { Events } from '../../../api/collections.js';

import '../html/eventlist.html';


Template.home.onCreated(function bodyOnCreated() {
	
	this.eventSub = this.subscribe("events"); //get events
});

Template.eventlist.helpers({
	formatDate(date){
		return moment(date).format('MM-DD-YYYY');
	}
});

Template.home.helpers({
	formatDate(date){
		return moment(date).format('MM-DD-YYYY');
	}
});

Template.home.helpers({
	event_today_list(){

		const start_day = moment().startOf('day')._d;
		const end_day = moment().endOf('day')._d;
		return Events.find({"event_date" : {"$gte": start_day, "$lte": end_day}});
	},

	event_incoming_list(){
		return Events.find({"event_date" : {"$gte": new Date()}});
	},

	event_past_list(){
		var today = new Date();
		var yesterday = new Date(today.getTime() - (24*60*60*1000));
		return Events.find({"event_date" : {"$lte": yesterday}});
	}

});

Template.home.events({

	'submit .eventselection'(event){
		event.preventDefault();

		if(Meteor.user()===null){
			alert("You should sign-in or log-in before see this!")
			FlowRouter.go('/');
			location.reload();
	    } else {
	    	const $el = $(event.currentTarget);
		 	const eventID = $el.find('.eventID').val();
		 	const eventtime = Date.parse($el.find('.eventtime').val());

		 	const start_day = Date.parse(moment().startOf('day')._d);
			const end_day = Date.parse(moment().endOf('day')._d);

		 	if(eventtime > start_day && eventtime < end_day){
		 		FlowRouter.go('bid', {id: eventID});
		 	} else if (eventtime < new Date()){
		 		FlowRouter.go('over', {id: eventID});
		 	} else {
		 		FlowRouter.go('soon', {id: eventID});
		 	}
		}
  	}
 
});