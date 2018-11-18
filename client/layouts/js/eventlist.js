import { Template } from 'meteor/templating';
import { Cookies } from 'meteor/mrt:cookies';
import d3 from 'd3';

import { Events } from '../../../api/collections.js';

import '../html/eventlist.html';


Template.home.onCreated(function bodyOnCreated() {

  this.eventSub = this.subscribe("events"); //get events
  
});

Template.home.helpers({

  eventalllist(){
    return Events.find({});
  }
});

Template.home.events({

	 'click .active_event'(event, template){

	 	event.preventDefault();

		if(Meteor.user()===null){
			alert("You should sign in before continue!");
			FlowRouter.go('signin');
		}else{
			// let id = Events.find({}).fetch()[0]._id;
			// console.log(id);

			const eventID = template.find('#eventID').value;
		  	FlowRouter.go('bid', {id: eventID});
	    }
  	}
 
});