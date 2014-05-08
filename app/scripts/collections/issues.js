/*global define*/

define([
    'underscore',
    'backbone',
    'models/issue'
], function (_, Backbone, IssueModel) {
    'use strict';

    var IssuesCollection = Backbone.Collection.extend({
        model: IssueModel,

        url: function(){
            return Backbone.app.url+'issues';
        },

        initialize: function(){
        	dev.c.issues = this;

            this.listenTo(Backbone.dispatcher, 'usersFetched', this.usersFetched);
        },

        parse: function(data){
        	return data.issues;
        },

        usersFetched: function(){
            this.fetch({
                success: function(){
                    Backbone.dispatcher.trigger('issuesFetched');
                },
            });
        },
    });

    return IssuesCollection;
});
