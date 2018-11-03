import { Template } from 'meteor/templating';
import { Cookies } from 'meteor/mrt:cookies';
import d3 from 'd3';

import { Bids, Items } from '../../../api/collections.js';

import '../html/admin.html';

// style
Template.admin.onRendered(function () {

  var body = d3.select('body')
      .style("opacity", "0")
      .transition().duration(700).style("opacity", "1");
});

Template.admin.onCreated(function bodyOnCreated() {

  if(Meteor.user()===null){
    alert("Smart ass!!! You should sign in to see this babe!");
    FlowRouter.go('login');
    Template.admin.hide();
  }else{
    this.itemSub = this.subscribe("items"); //get items
  }
});

Template.admin.helpers({
  
  item(){
    return Items.findOne({});
  }

});

Template.admin.events({

  'submit .pannel'(event){
      event.preventDefault();
      const $el = $(event.currentTarget);
      const $itemid = $el.find('.itemidpannel');

      if(Meteor.user()===null){
        alert("You should sign-in before doing anything and specially this!");
        FlowRouter.go('signin');
      }else{
        Meteor.call("startBid", $itemid.val(), function(err,res){
            if(err){
             console.log('Error start bid: '+err);
            }
        });
        FlowRouter.go('bid');
      }
  }
});