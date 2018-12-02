import { Template } from 'meteor/templating';
import d3 from 'd3';

import { Bids } from '../../../api/collections.js';

import '../html/leaderboard.html';

// style
Template.leaderboard.onRendered(function () {

  var body = d3.select('body')
      .style("opacity", "0")
      .transition().duration(700).style("opacity", "1");

  var winnername = d3.select('.winnername')
      .style("opacity", "0")
      .transition().duration(20000).style("opacity", "1");

  var winnerprice = d3.select('.winnerprice')
      .style("opacity", "0")
      .transition().duration(20000).style("opacity", "1");
});

Template.leaderboard.onCreated(function bodyOnCreated() {

  if(Meteor.user()===null){
    FlowRouter.go('/');

  }else{
    this.bidSub = this.subscribe("bids"); //get bids
  }

});

Template.leaderboard.helpers({
  
  firstnameWinner(){
    const firstname = Bids.findOne({event_ID: FlowRouter.getParam("id")}, {sort: {itemPrice: -1, limit: 1}}).firstname;
    const f = firstname.toUpperCase();
    return f;
  }, 

  lastnameWinner(){
    const lastname = Bids.findOne({event_ID: FlowRouter.getParam("id")}, {sort: {itemPrice: -1, limit: 1}}).lastname;
    const l = lastname.toUpperCase();
    return l;
  },

  priceWinner(){
    const itemPrice = Bids.findOne({event_ID: FlowRouter.getParam("id")}, {sort: {itemPrice: -1, limit: 1}}).itemPrice;
    return itemPrice;
  },

  formatDate(date){
    return moment(date).format('HH:mm:ss');
  }

});

Template.leaderboard.events({

  'click .cancelbtnbid'(){
    FlowRouter.go('home');
  }

});