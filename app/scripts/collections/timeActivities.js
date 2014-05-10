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
            
            this.listenTo(Backbone.dispatcher, 'currentUserFetched', this.afterCurrentUser);
        },

        afterCurrentUser: function(){
            this.fetch({
                success: function(){
                    Backbone.dispatcher.trigger('timeActivitiesFetched');
                },
            });
        },

        parse: function(data){
        	return data.time_entry_activities;
        },
    });

    return TimeactivitiesCollection;
});
