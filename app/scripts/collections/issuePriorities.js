/*global define*/

define([
    'underscore',
    'backbone',
    'models/issuePriority'
], function (_, Backbone, IssuepriorityModel) {
    'use strict';

    var IssueprioritiesCollection = Backbone.Collection.extend({
        model: IssuepriorityModel,

        url: function(){
            return Backbone.app.url+'enumerations/issue_priorities';
        },

        parse: function(data){
        	return data.issue_priorities;
        },

        initialize: function(){
            dev.c.issuePriorities = this;
            
            this.listenTo(this, 'add', this.added);

            this.listenTo(Backbone.dispatcher, 'currentUserFetched', this.afterCurrentUser);
        },

        afterCurrentUser: function(){
            this.fetch({
                success: function(){
                    Backbone.dispatcher.trigger('issuePrioritiesFetched');
                },
            });
        },

        added: function(model){
            model.set({
                'opacity': this.indexOf(model)/this.length,
            });
        },
    });

    return IssueprioritiesCollection;
});
