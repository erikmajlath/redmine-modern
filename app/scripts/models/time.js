/*global define*/

define([
    'underscore',
    'backbone',
    'models/issue',
    'models/project',
    'models/user',
    'models/timeActivity',
    'relational',
], function (_, Backbone, IssueModel, ProjectModel, UserModel, TimeActivityModel) {
    'use strict';

    var TimeModel = Backbone.RelationalModel.extend({

    	relations: [
    		//Issue - Time Entry relation
    		{
    			type: 'HasOne',
    			key: 'issue_id',
    			relatedModel: IssueModel,
    			includeInJSON: 'id',
    			reverseRelation: {
    				key: 'times',
    				relatedModel: this,
    				includeInJSON: false,
    			},
    		},
    		//Project - Time Entry relation
    		{
    			type: 'HasOne',
    			key: 'project_id',
    			relatedModel: ProjectModel,
    			includeInJSON: 'id',
    			reverseRelation: {
    				key: 'times',
    				relatedModel: this,
    				includeInJSON: false,
    			},
    		},
    		//User - Time Entry relation
    		{
    			type: 'HasOne',
    			key: 'user_id',
    			relatedModel: UserModel,
    			includeInJSON: 'id',
    			reverseRelation: {
    				key: 'times',
    				relatedModel: this,
    				includeInJSON: false,
    			},
    		},
            //TimeActivity - Time Entry relation
            {
                type: 'HasOne',
                key: 'activity_id',
                relatedModel: TimeActivityModel,
                includeInJSON: 'id',
            },
    	],

    	initialize: function(){
    	},

        defaults: {
        },

        parse: function(data){
            return data;
        },

        sync: function(method, model, options){
            var options = options || {};

            //Need to change data type later
            //Thus sending new variable in which i'll store data
            //ll do that in ajaxPrefilter globally
            if(method == "create" || method == "update")
                options.redmineApiDataFix = 'time_entry';

            Backbone.Model.prototype.sync.call(this, method, model, options);
        },
    });

    return TimeModel;
});
