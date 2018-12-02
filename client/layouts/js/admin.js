import { Template } from 'meteor/templating';
import { Cookies } from 'meteor/mrt:cookies';
import d3 from 'd3';

import { Bids, Items, Events } from '../../../api/collections.js';

import '../html/admin.html';

// style
Template.admin.onRendered(function () {

  var body = d3.select('body')
      .style("opacity", "0")
      .transition().duration(700).style("opacity", "1");
});

Template.admin.onCreated(function bodyOnCreated() {

  setInterval(function(){ 
    if(Meteor.user() === null || Meteor.user().emails[0].address != "jadedagheresme@gmail.com"){
      FlowRouter.go('/');
      location.reload();
    }
  }, 150);

  // this.itemSub = this.subscribe("items"); //get items
  this.eventsSub = this.subscribe("events"); //get events

});

Template.admin.helpers({
});

Template.admin.events({

  'submit .startgame'(event){

      event.preventDefault();
      const $el = $(event.currentTarget);
      const $eventid = $el.find('.eventidpannel');

      Meteor.call("startBid", $eventid.val(), function(err,res){
        if(err){
          alert(err.reason);
        } else {
          FlowRouter.go('bid', {id: $eventid.val()});
        }
      });
  },

  //refaire le dashboard

  'submit .resetgame'(event){

      event.preventDefault();
      const $el = $(event.currentTarget);
      const $eventid = $el.find('.eventidpannel_reset');

      Meteor.call("resetBid", $eventid.val(), function(err,res){
        if(err){
          alert(err.reason);
        } else {
          FlowRouter.go('bid', {id: $eventid.val()});
        }
      });
    
  },

  'submit .createevent'(event){

      event.preventDefault();
      const $el = $(event.currentTarget);

      const $eventName = $el.find('.event_name').val();
      const $eventLocation = $el.find('.event_location').val();
      const $eventDate = new Date($el.find('.event_date').val());
      const $eventTime = $el.find('.event_time').val();
      const $productName = $el.find('.product_name').val();
      const $productPrice = parseInt($el.find('.product_initialprice').val());
      const $productImg = $el.find('.product_img').val();

      const data = {eventName: $eventName, eventLocation: $eventLocation, eventDate: $eventDate, 
                    eventTime: $eventTime, productName: $productName, productPrice: $productPrice, productImg: $productImg};
      // console.log(data);
      Meteor.call("createevent", data, function(err,res){
        if(err){
          alert(err.reason);
        } else {
          alert("New event has been created and added to home")
          FlowRouter.go('home');
        }
      });
  }, 

  'submit .deleteevent'(event){

      event.preventDefault();
      const $el = $(event.currentTarget);
      const $eventid = $el.find('.eventidpannel_delete');

      Meteor.call("deleteevent", $eventid.val(), function(err,res){
        if(err){
          alert(err.reason);
        } else {
          alert("Event has been removed from home")
          FlowRouter.go('home');
        }
      });
  },


  
});


