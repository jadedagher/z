import { Template } from 'meteor/templating';
import { Cookies } from 'meteor/mrt:cookies';
import d3 from 'd3';

import { Bids } from '../../../api/collections.js';

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
    },
    'click .redirect_to_loginFB'() {
        // event.preventDefault();
        Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(err){
            if (err) {
                console.log('Handle errors here: ', err);
            } else {
                FlowRouter.go('home')
            }
        });
    }
});
