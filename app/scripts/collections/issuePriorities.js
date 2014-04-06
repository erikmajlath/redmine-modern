/*global define*/

define([
    'underscore',
    'backbone',
    'models/issuePriority'
], function (_, Backbone, IssuepriorityModel) {
    'use strict';

    var IssueprioritiesCollection = Backbone.Collection.extend({
        model: IssuepriorityModel,
        url: 'http://localhost:3000/enumerations/issue_priorities',

        parse: function(data){
        	return data.issue_priorities;
        },

        initialize: function(){
            dev.c.issuePriorities = this;
            
            this.on('sync', this.onReset);
        },

        onReset: function(e){
            //Tell applicaiton that this has been fetched
            Backbone.dispatcher.trigger('fetchComplete', 'issuePriorities');
        },
    });

    return IssueprioritiesCollection;
});
