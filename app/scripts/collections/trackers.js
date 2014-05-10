/*global define*/

define([
    'underscore',
    'backbone',
    'models/tracker'
], function (_, Backbone, TrackersModel) {
    'use strict';

    var TrackersCollection = Backbone.Collection.extend({
        model: TrackersModel,

        url: function(){
            return Backbone.app.url+'trackers';
        },


        parse: function(data){
        	return data.trackers;
        },

        initialize: function(){
            dev.c.trackers = this;
            
            this.listenTo(Backbone.dispatcher, 'currentUserFetched', this.afterCurrentUser);
        },

        afterCurrentUser: function(){
            this.fetch({
                success: function(){
                    Backbone.dispatcher.trigger('trackersFetched');
                },
            });
        },
    });

    return TrackersCollection;
});
