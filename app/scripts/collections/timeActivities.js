/*global define*/

define([
    'underscore',
    'backbone',
    'models/timeActivity'
], function (_, Backbone, TimeactivityModel) {
    'use strict';

    var TimeactivitiesCollection = Backbone.Collection.extend({
        model: TimeactivityModel,

        url: function(){
            return Backbone.app.url+'enumerations/time_entry_activities';
        },

        initialize: function(){
            dev.c.timeActivities = this;
            
            this.on('sync', this.onReset);
        },

        onReset: function(e){
            //Tell applicaiton that this has been fetched
            Backbone.dispatcher.trigger('fetchComplete', 'timeActivities');
        },

        parse: function(data){
        	return data.time_entry_activities;
        },
    });

    return TimeactivitiesCollection;
});
