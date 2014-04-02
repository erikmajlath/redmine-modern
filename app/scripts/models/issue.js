/*global define*/

define([
    'underscore',
    'backbone',
    'models/project',
    'models/user',
    'collections/issues',
    'relational',
], function (_, Backbone, ProjectModel, UserModel, IssuesCollection) {
    'use strict';

    var IssueModel = Backbone.RelationalModel.extend({
    	relations:[
    		//relation to Project
    		{
	    		type: 'HasOne',
	    		key: 'projectModel',
	    		relatedModel: ProjectModel,
	    		includeInJSON: false,
	    		reverseRelation: {
	    			type: 'HasMany',
	    			key: 'issues',
	    			relatedModel: this,
	    			includeInJSON: false,
	    		},
    		},
    		//relation to User
    		{
    			type: 'HasOne',
    			key: 'userModel',
    			relatedModel: UserModel,
    			includeInJSON: false,
    			reverseRelation: {
    				tpe: 'HasMany',
    				key: 'issues',
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
        	var project = Backbone.c.projects.get(this.get('project').id);
        	this.set('projectModel', project);

        	if(this.get('assigned_to')){
        		var user = Backbone.c.users.get(this.get('assigned_to').id);
        		this.set('userModel', user);	
        	}
        },
    });

    return IssueModel;
});
