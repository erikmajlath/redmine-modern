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
            
            this.on('sync', this.onReset);
        },

        onReset: function(e){
            //Tell applicaiton that this has been fetched
            Backbone.dispatcher.trigger('fetchComplete', 'trackers');
        },
    });

    return TrackersCollection;
});
