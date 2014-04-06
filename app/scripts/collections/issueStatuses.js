/*global define*/

define([
    'underscore',
    'backbone',
    'models/issueStatus'
], function (_, Backbone, IssuestatusModel) {
    'use strict';

    var IssuestatusesCollection = Backbone.Collection.extend({
        model: IssuestatusModel,
        url: 'http://localhost:3000/issue_statuses',

        parse: function(data){
        	return data.issue_statuses;
        },

        initialize: function(){
            dev.c.issueStatuses = this;
            
            this.on('sync', this.onReset);
        },

        onReset: function(e){
            //Tell applicaiton that this has been fetched
            Backbone.dispatcher.trigger('fetchComplete', 'issueStatuses');
        },
    });

    return IssuestatusesCollection;
});
