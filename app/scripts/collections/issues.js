/*global define*/

define([
    'underscore',
    'backbone',
    'models/issue'
], function (_, Backbone, IssueModel) {
    'use strict';

    var IssuesCollection = Backbone.Collection.extend({
        model: IssueModel,

        url: 'http://localhost:3000/issues',

        initialize: function(){
        	dev.c.issues = this;
        	this.fetch();
        },

        parse: function(data){
        	return data.issues;
        },
    });

    return IssuesCollection;
});
