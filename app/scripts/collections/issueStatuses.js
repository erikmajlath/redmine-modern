/*global define*/

define([
    'underscore',
    'backbone',
    'models/issueStatus'
], function (_, Backbone, IssuestatusModel) {
    'use strict';

    var IssuestatusesCollection = Backbone.Collection.extend({
        model: IssuestatusModel,

        url: function(){
            return Backbone.app.url+'issue_statuses';
        },

        parse: function(data){
        	return data.issue_statuses;
        },

        initialize: function(){
            dev.c.issueStatuses = this;
            
            this.listenTo(Backbone.dispatcher, 'currentUserFetched', this.afterCurrentUser);
        },

        afterCurrentUser: function(){
            this.fetch({
                success: function(){
                    Backbone.dispatcher.trigger('issueStatusesFetched');
                },
            });
        },
    });

    return IssuestatusesCollection;
});
