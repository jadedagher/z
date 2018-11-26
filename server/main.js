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

    // Events.insert({
    //     product_ID: "xx",
    //     event_name: "la super event",
    //     event_location: "au liban",
    //     event_time: ISODate("2018-10-01T08:17:02.735Z"),
    //     product_name: "pirogue",
    //     product_initialPrice: 165,
    //     winner_name: null,
    //     winner_price: null,
    //     bid_time: null,
    //     bidstart: null,
    //     launchedAt: null,
    //     finishedAt: null,
    //     bidAt: null,
    //     buyAt: 1,
    //     createdAt: new Date()
    // });

    // Events.insert({
    //     product_ID: "cc",
    //     event_name: "turing racer",
    //     event_location: "à paris",
    //     event_time: ISODate("2018-12-01T08:17:02.735Z"),
    //     product_name: "voiture",
    //     product_initialPrice: 191,
    //     winner_name: null,
    //     winner_price: null,
    //     bid_time: null,
    //     bidstart: null,
    //     launchedAt: null,
    //     finishedAt: null,
    //     bidAt: null,
    //     buyAt: 1,
    //     createdAt: new Date()
    // });

    // Events.insert({
    //     product_ID: "ii",
    //     event_name: "care",
    //     event_location: "à paris",
    //     event_time: "2018-11-25T09:00:00.00Z",
    //     product_name: "laptop",
    //     product_initialPrice: 1092,
    //     winner_name: null,
    //     winner_price: null,
    //     bid_time: null,
    //     bidstart: null,
    //     launchedAt: null,
    //     finishedAt: null,
    //     bidAt: null,
    //     buyAt: 1,
    //     createdAt: new Date()
    // });

});

