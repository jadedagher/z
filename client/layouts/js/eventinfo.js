import { Template } from 'meteor/templating';
import { Cookies } from 'meteor/mrt:cookies';
import { ReactiveVar } from 'meteor/reactive-var';
import d3 from 'd3';

import { Bids, Events } from '../../../api/collections.js';

import '../html/eventinfo.html';

// style
Template.eventinfo.onRendered(function () {

  var body = d3.select('body')
      .style("opacity", "0")
      .transition().duration(700).style("opacity", "1");

  var bidbtn = d3.select('.button')
      .style("font-size", "0")
      .transition().style("font-size","23px").duration(1500);

})

Template.eventinfo.onCreated(function bodyOnCreated() {

  if(Meteor.user()===null){
    FlowRouter.go('/');
    Template.bid.hide();

  }else{
    this.itemSub = this.subscribe("events"); //get events data
  }
});


Template.eventinfo.helpers({

  events(){
    return Events.findOne({_id: FlowRouter.getParam("id")})
  },

  formatDate(date){
    return moment(date).format('MM-DD-YYYY');
  }

});

Template.eventinfo.events({

  'click .cancelbtnevent'(){
    FlowRouter.go('home');
  }
  
});
  