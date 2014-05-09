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
            var newData = _(data.issues).map(function(issue){
                //Match data from server to form
                //compatible with REST API
                issue.project_id = issue.project.id;  
                issue.status_id = issue.status.id;
                issue.priority_id = issue.priority.id;
                issue.tracker_id = issue.tracker.id;

                if(issue.assigned_to)
                    issue.assigned_to_id = issue.assigned_to.id;

                return issue;
            });
        	return newData;
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
