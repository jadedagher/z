import { Meteor } from 'meteor/meteor';
import { Items, Events, Credentials } from '../api/collections.js';

Meteor.startup(() => {

    ServiceConfiguration.configurations.remove({
        service: 'google'
    });
    ServiceConfiguration.configurations.remove({
        service: "facebook"
    });

    ServiceConfiguration.configurations.insert({
        service: 'google',
        clientId: Credentials.findOne({service:"google"}).appId,
        secret: Credentials.findOne({service:"google"}).secret
    });

    ServiceConfiguration.configurations.insert({
        service: "facebook",
        appId: Credentials.findOne({service:"facebook"}).appId,
        secret: Credentials.findOne({service:"facebook"}).secret
    }); 

});

