import { Template } from 'meteor/templating';
import { Cookies } from 'meteor/mrt:cookies';
import d3 from 'd3';

import { Bids } from '../../../api/collections.js';

import '../html/over.html';

// style
Template.over.onRendered(function () {

  var body = d3.select('body')
      .style("opacity", "0")
      .transition().duration(700).style("opacity", "1");
});

Template.over.onCreated(function bodyOnCreated() {

	if(Meteor.user()===null){
	    alert("Smart ass!!! You should sign in to see this babe!");
	    FlowRouter.go('/');
	    Template.over.hide();   
	}
});

Template.over.helpers({
});

Template.over.events({
	
	'click .back_home'(){
    	FlowRouter.go('home');
    }
 
});