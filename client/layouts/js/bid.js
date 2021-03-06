import { Template } from 'meteor/templating';
import { Cookies } from 'meteor/mrt:cookies';
import { ReactiveVar } from 'meteor/reactive-var';
import d3 from 'd3';

import { Bids, Events } from '../../../api/collections.js';

import '../html/bid.html';

// style
Template.bid.onRendered(function () {

  var body = d3.select('body')
      .style("opacity", "0")
      .transition().duration(700).style("opacity", "1");

  var bidbtn = d3.select('.button')
      .style("font-size", "0")
      .transition().style("font-size","23px").duration(1500);

})

Template.bid.onCreated(function bodyOnCreated() {

  if(Meteor.user()===null){
    FlowRouter.go('/');
    Template.bid.hide();

  }else{

    this.itemSub = this.subscribe("events"); //get events data
    
    this.timer = new ReactiveVar(0);
    this.interval = Meteor.setInterval(() => this.timer.set(this.timer.get() + 1), 20);

    this.timermili = new ReactiveVar(0);
    this.intervalmili = Meteor.setInterval(() => this.timermili.set(this.timermili.get() + 1), 1);
  }
});


Template.bid.helpers({

  events(){
    return Events.findOne({_id: FlowRouter.getParam("id")})
  },

  price(product_initialPrice, bidAt, buyAt) {

    let elapstedTime;

    if (!bidAt) {
      return product_initialPrice;
    } 

    // else if (bidAt && buyAt) {
    //   return elapstedTime = (buyAt - bidAt) / 1000
    // } 

    else {
      elapstedTime = (Date.now() - bidAt) / 1000; // in s
    }

    const timer = Template.instance().timer.get(); // TO KEEP IN ORDER TO RELOAD HTMLÒ
    const timeToZero = 60;
    let price = product_initialPrice - (elapstedTime * product_initialPrice) / timeToZero;
    price = price >= 0 ? Math.round(price) : 0;

    if(price === 0){
      setInterval(function(){ 
        document.getElementById("finished").style.display = "block";
        document.getElementById("rules").style.display = "none";
        document.getElementById("surebid_text").style.display = "none";
        document.getElementById("surebid").style.display = "none";
        document.getElementById("bidbtn").style.display = "none";
      }, 2000);
    }

    return price ;
  },
  
  timeRemaining(bidAt, buyAt) {
    const timeToZero = 60;

    if (!bidAt){
      return timeToZero;
    } 

    const timer = Template.instance().timer.get(); // TO KEEP IN ORDER TO RELOAD HTML
    const elapstedTime = Math.round((Date.now() - bidAt) / 1000); // in s
    
    return elapstedTime > timeToZero ? 0 : timeToZero - elapstedTime;
  },

  milisecond(bidAt, buyAt){
    const timeToZeroMili = 60000;
    
    const timermili = Template.instance().timermili.get(); // TO KEEP IN ORDER TO RELOAD HTML
    const elapstedTimemili = Math.round((Date.now() - bidAt)); // in s

    return elapstedTimemili > timeToZeroMili ? 0 : timeToZeroMili - elapstedTimemili;
  }

});

Template.bid.events({
  
  //send message
  'submit .message'(event, instance) {
    event.preventDefault();

    if(Meteor.user()===null){
      alert("You should sign in before bidding!");
      FlowRouter.go('signin');

    }else{

      var checkBox = document.getElementById("surebid");

      if (checkBox.checked == true){
      
        const $el = $(event.currentTarget);

        const $itemid = $el.find('.itemid');
        const $eventid = $el.find('.eventid');
        const $itemprice = parseInt($el.find('.itemprice').val()); //converting itemprice in number
        

        // console.log("itemid "+$itemid.val()); 
        // console.log("eventid "+$eventid.val()); 
        // console.log("itemprice "+$itemprice); 


        const data = {itemID: $itemid.val(), eventID: $eventid.val(), itemPrice: $itemprice};

        alert("You just bid at " +$itemprice+ "€ Thank you!!!");
        
        Meteor.call("sendBid", data, (error, response) => {
          if (error) {
            alert(error.reason);
          } else {
            //nothing
          }
        });
      } else {
        alert("Check the box if you really want to bid!");
      }
    }

  },

  'click .cancelbtnbid'(){
    FlowRouter.go('home');
  },

  'click .trophybtnbid'(){
    FlowRouter.go('leaderboard', {id: FlowRouter.getParam("id")});
  }
  
});
  