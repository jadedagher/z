import { Template } from 'meteor/templating';
import { Cookies } from 'meteor/mrt:cookies';
import d3 from 'd3';

import { Events } from '../../../api/collections.js';

import '../html/countdown.html';


Template.countdown.onCreated(function bodyOnCreated() {
	this.eventSub = this.subscribe("events"); //get events
});


Template.countdown.helpers({
	events(){
    	return Events.findOne({_id: FlowRouter.getParam("id")})
  	}
});

Template.countdown.events({
});


  var timeinterval;
 
  Meteor.startup(function time() {
  	var gettime = "j"
  	console.log(gettime);
    var endtime = 'April 30 2019 05:47:30 UTC-0400';
    timeinterval = setInterval(function () {
      Meteor.call("getCurrentTime", function (error, result) {
        Session.set("time", result);
        var t = getTimeRemaining(endtime);
        Session.set("t", t);
      });
    }, 1000);
  });
 
  function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Session.get('time');
    var seconds = ("0" + Math.floor( (t/1000) % 60 )).slice(-2);
    var minutes = ("0" + Math.floor( (t/1000/60) % 60 )).slice(-2);
    var hours = ("0" + Math.floor( (t/(1000*60*60)) % 24 )).slice(-2);
    var days = Math.floor( t/(1000*60*60*24) );

    if(t <= 0)
      clearInterval(timeinterval);
 
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
 
  }
 
  Template.countdown.helpers({
    t: function () {
      return Session.get("t");
    }
  });
 
  Template.body.helpers({
    ended:function () {
      return Session.get("t").total <= 0;
    }
  });