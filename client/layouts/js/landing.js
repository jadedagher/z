import { Template } from 'meteor/templating';
import { Cookies } from 'meteor/mrt:cookies';
import d3 from 'd3';

import { Bids, Items } from '../../../api/collections.js';

import '../html/landing.html';

// style
Template.landing.onRendered(function () {

  var body = d3.select('body')
      .style("opacity", "0")
      .transition().duration(700).style("opacity", "1");
});

Template.landing.onCreated(function bodyOnCreated() {
});

Template.landing.events({

  'click .redirect_to_login'() {
    FlowRouter.go('login');
  },

  'click .redirect_to_signin'() {
    FlowRouter.go('signin');
  }
});
