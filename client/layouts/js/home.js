import { Template } from 'meteor/templating';
import { Cookies } from 'meteor/mrt:cookies';
import d3 from 'd3';

import { Bids, Items } from '../../../api/collections.js';

import '../html/home.html';

// style
Template.home.onRendered(function () {

  var body = d3.select('body')
      .style("opacity", "0")
      .transition().duration(700).style("opacity", "1");
});

Template.home.onCreated(function bodyOnCreated() {
  
  //set inerval to let meteor create user and check it 
  setInterval(function(){ 
    if(Meteor.user()===null){
      FlowRouter.go('login');
      location.reload();
    }
  }, 5000);

  this.itemSub = this.subscribe("items"); //get items
  
});

Template.home.helpers({
  findfirstname(){
    return Meteor.user().profile.firstname;
  }, 

  item(){
    return Items.findOne({});
  }
});

Template.home.events({

	 'click .active_event'(){
		if(Meteor.user()===null){
			alert("You should sign in before continue!");
			FlowRouter.go('signin');
	  }else{
	  		FlowRouter.go('bid');
	    }
  	},

  	'click .over_event'(){
    	FlowRouter.go('over');
  	},

  	'click .soon_event'(){
    	FlowRouter.go('soon');
  	},

    'click .logout'(event){
      event.preventDefault();
      Meteor.logout();
      FlowRouter.go('login');
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

