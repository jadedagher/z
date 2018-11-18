import { Template } from 'meteor/templating';
import { Cookies } from 'meteor/mrt:cookies';
import d3 from 'd3';

import { Bids } from '../../../api/collections.js';

import '../html/signin.html';

// style
Template.signin.onRendered(function () {

  var body = d3.select('body')
      .style("opacity", "0")
      .transition().duration(700).style("opacity", "1");
});


Template.signin.events({

  'submit .register'(event, template) {
    event.preventDefault();

    var checkBox = document.getElementById("age");

    if (checkBox.checked == true){
    
      var $inputFirstname = template.find('#inputFirstnameSignin').value;
      var $inputLastname = template.find('#inputLastnameSignin').value;

      var $inputEmail = template.find('#inputEmailSignin').value;
      var $inputPassword = template.find('#inputPasswordSignin').value;
      
      const data = {firstname: $inputFirstname, lastname: $inputLastname, email: $inputEmail, password: $inputPassword};

      Meteor.call("signin", data, (error, response) => {
        if (error) {
          alert(error.reason);
        } else {
          Meteor.loginWithPassword($inputEmail, $inputPassword);
          FlowRouter.go('home');
        }
      });

    } else {
      alert("Check the box");
    }
  },

  'click .redirect_to_login'() {
    FlowRouter.go('login');
  }
});
