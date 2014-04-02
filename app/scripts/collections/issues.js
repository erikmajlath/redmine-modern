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

            this.on('sync', this.onReset);
            this.listenTo(Backbone.dispatcher, 'fetchComplete', this.relationDependencies);

            //Those thing gotta be fethced before making relations
            this.dep = {
                projects: false,
                users: false,
                issues: false,
            }
        },

        parse: function(data){
        	return data.issues;
        },

        onReset: function(){
            //Tell applicaiton that this has been fetched
            Backbone.dispatcher.trigger('fetchComplete', 'issues');
        },

        relationDependencies: function(thing){
            this.dep[thing] = true;

            if(this.dep.projects && this.dep.users && this.dep.issues){
                this.each(function(item){
                    item.makeRelations();
                });
            }
        },
    });

    return IssuesCollection;
});
