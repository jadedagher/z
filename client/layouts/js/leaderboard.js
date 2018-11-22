import { Template } from 'meteor/templating';
import d3 from 'd3';

import { Bids } from '../../../api/collections.js';

import '../html/leaderboard.html';

// style
Template.leaderboard.onRendered(function () {

  var body = d3.select('body')
      .style("opacity", "0")
      .transition().duration(700).style("opacity", "1");
});

Template.leaderboard.onCreated(function bodyOnCreated() {

  if(Meteor.user()===null){
    alert("Smart ass!!! You should sign in to see this babe!");
    FlowRouter.go('/');

  }else{
    this.bidSub = this.subscribe("bids"); //get bids
  }
});

Template.leaderboard.helpers({
  
  bidslist(){
    return Bids.find({}, { sort: { itemPrice: -1 } });
  }

});

Template.leaderboard.events({

  'click .cancelbtnbid'(){
    FlowRouter.go('home');
  }
  
});