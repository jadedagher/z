import { Template } from 'meteor/templating';
import { Cookies } from 'meteor/mrt:cookies';
import d3 from 'd3';

import { Bids } from '../../../api/collections.js';

import '../html/soon.html';

// style
Template.soon.onRendered(function () {

  var body = d3.select('body')
      .style("opacity", "0")
      .transition().duration(700).style("opacity", "1");
});

Template.soon.onCreated(function bodyOnCreated() {
	if(Meteor.user()===null){
	    FlowRouter.go('/');
	    Template.soon.hide();   
	}
});

Template.soon.helpers({
});

Template.soon.events({
	'click .back_home'(){
		FlowRouter.go('home');
	}
});