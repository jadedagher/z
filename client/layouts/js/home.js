import { Template } from 'meteor/templating';
import { Cookies } from 'meteor/mrt:cookies';
import d3 from 'd3';

import { Bids, Events } from '../../../api/collections.js';

import '../html/home.html';
import './eventlist.js';
import './loader.html';

// style
Template.home.onRendered(function () {

  var body = d3.select('body')
      .style("opacity", "0")
      .transition().duration(700).style("opacity", "1");
});

Template.home.onCreated(function bodyOnCreated() {  
});

Template.home.helpers({
});

Template.home.events({

  	'click .over_event'(){
    	FlowRouter.go('over');
  	},

  	'click .soon_event'(){
    	FlowRouter.go('soon');
  	},

    'click .logout'(){
      Meteor.logout();
      FlowRouter.go('/');
    },
  	// filters
  	'click .todayfilter'(){
  		$('.todaycontainer').show();
  		$('.incomingcontainer').hide();
  		$('.pastcontainer').hide();
   	},

  	'click .incomingfilter'(){
  		$('.todaycontainer').hide();
  		$('.incomingcontainer').show();
  		$('.pastcontainer').hide();
  	},

  	'click .pastfilter'(){
  		$('.todaycontainer').hide();
  		$('.incomingcontainer').hide();
  		$('.pastcontainer').show();
  	},

  	'click .allfilter'(){
  		$('.todaycontainer').show();
  		$('.incomingcontainer').show();
  		$('.pastcontainer').show();
  	}
 
});

