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
            var newData = _(data.time_entries).map(function(time){ 

                time.issue_id = time.issue.id;
                time.project_id = time.project.id;
                time.user_id = time.user.id;
                time.activity_id = time.activity.id;

                return time;
            })

        	return newData;
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
