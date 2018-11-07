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

  setInterval(function(){ 
    if(Meteor.user() === null || Meteor.user().emails[0].address != "jadedagheresme@gmail.com"){
      alert("Smart ass!!! You should see this!");
      FlowRouter.go('login');
      location.reload();
    }
  }, 150);

  this.itemSub = this.subscribe("items"); //get items

});

Template.admin.helpers({
  
  item(){
    return Items.findOne({});
  }

});

Template.admin.events({

  'submit .startgame'(event){
      event.preventDefault();
      const $el = $(event.currentTarget);
      const $itemid = $el.find('.itemidpannel');

      Meteor.call("startBid", $itemid.val(), function(err,res){
        if(err){
          console.log('Error startbid: '+err);
        }
      });
    FlowRouter.go('bid');
  }, 

  'submit .resetgame'(event){

      event.preventDefault();

      Meteor.call("resetBid", function(err,res){
        if(err){
          console.log('Error resetbid: '+err);
        }
      });
  },

  'submit .populatedb'(event, template){
      event.preventDefault();

      const $inputname = template.find('#itemname').value;
      const $inputprice = parseInt(template.find('#itemprice').value);
      
      const data = {itemname: $inputname, itemprice: $inputprice};

      Meteor.call("populateitemdb", data, function(err,res){
        if(err){
          console.log('Error populateitemdb: '+err);
        }
      });
    FlowRouter.go('bid');
  },

  'submit .test_populatedb'(event){
      event.preventDefault();

      Meteor.call("test_populateitemdb", function(err,res){
        if(err){
          console.log('Error test_populateitemdb: '+err);
        }
      });
    FlowRouter.go('bid');
  }
});


