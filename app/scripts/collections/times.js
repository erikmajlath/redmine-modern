/*global define*/

define([
    'underscore',
    'backbone',
    'models/time'
], function (_, Backbone, TimeModel) {
    'use strict';

    var TimesCollection = Backbone.Collection.extend({
        model: TimeModel,

        url: function(){
            return Backbone.app.url+'time_entries';
        },

        initialize: function(){
        	dev.c.times = this;

            this.listenTo(Backbone.dispatcher, 'issuesFetched', this.issuesFetched);
        },

        parse: function(data){
        	return data.time_entries;
        },

        issuesFetched: function(){
            this.fetch({
                success: function(){
                    Backbone.dispatcher.trigger('timesFetched');
                },
            });
        },
    });

    return TimesCollection;
});
