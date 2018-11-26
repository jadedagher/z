import { Template } from 'meteor/templating';
import d3 from 'd3';


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
        Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(err){
            if (err) {
                console.log('Handle errors here: ', err);
            }else{
                setInterval(function(){FlowRouter.go('home')}, 1000);
            }
        });
    },

    'click .redirect_to_loginGoogle'() {
        Meteor.loginWithGoogle({
            requestOfflineToken: true,
            requestPermissions: ['email', 'profile'],
        }, (error) => {
            if (error) {
                console.log('Handle errors here: ', err);
            }else{
                setInterval(function(){FlowRouter.go('home')}, 1000);
            }
        });
    }
});
