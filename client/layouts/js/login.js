import { Template } from 'meteor/templating';
import { Cookies } from 'meteor/mrt:cookies';

import { Bids } from '../../../api/collections.js';

import '../html/login.html';


Template.login.events({

  'submit .login'(event, template) {
    event.preventDefault();

    var checkBox = document.getElementById("age");
    
    var $inputEmail = template.find('#inputEmailLogin').value;
    var $inputPassword = template.find('#inputPasswordLogin').value;

    Meteor.loginWithPassword($inputEmail, $inputPassword, (error, response) => {
      if (error) {
          alert(error.reason);
      } else {
          FlowRouter.go('home');
      }
    });
  },

  'click .redirect_to_signin'() {
    FlowRouter.go('signin');
  }

});
