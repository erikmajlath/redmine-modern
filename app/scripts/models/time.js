/*global define*/

define([
    'underscore',
    'backbone',
    'models/issue',
    'models/project',
    'models/user',
    'relational',
], function (_, Backbone, IssueModel, ProjectModel, UserModel) {
    'use strict';

    var TimeModel = Backbone.RelationalModel.extend({

    	relations: [
    		//Issue - Time Entry relation
    		{
    			type: 'HasOne',
    			key: 'issueModel',
    			relatedModel: IssueModel,
    			includeInJSON: false,
    			reverseRelation: {
    				key: 'times',
    				relatedModel: this,
    				includeInJSON: false,
    			},
    		},
    		//Project - Time Entry relation
    		{
    			type: 'HasOne',
    			key: 'projectModel',
    			relatedModel: ProjectModel,
    			includeInJSON: false,
    			reverseRelation: {
    				key: 'times',
    				relatedModel: this,
    				includeInJSON: false,
    			},
    		},
    		//User - Time Entry relation
    		{
    			type: 'HasOne',
    			key: 'userModel',
    			relatedModel: UserModel,
    			includeInJSON: false,
    			reverseRelation: {
    				key: 'times',
    				relatedModel: this,
    				includeInJSON: false,
    			},
    		},
    	],

    	initialize: function(){
    	},

        defaults: {
        },

        makeRelations: function(){

			var issue = Backbone.c.issues.get(this.get('issue').id);
			this.set('issueModel', issue);

			var project = Backbone.c.projects.get(this.get('project').id);
			this.set('projectModel', project);

			var user = Backbone.c.users.get(this.get('user').id);
			this.set('userModel', user);
        },
    });

    return TimeModel;
});
