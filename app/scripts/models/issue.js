/*global define*/

define([
    'underscore',
    'backbone',
    'models/project',
    'models/user',
    'models/issueStatus',
    'models/issuePriority',
    'models/tracker',
    'models/journal',
    'collections/issueJournals',
    'relational',
    'date',
], function (_, Backbone, ProjectModel, UserModel, IssueStatusModel, IssuePriorityModel, TrackerModel, JournalModel, IssueJournalsCollection) {
    'use strict';

    var IssueModel = Backbone.RelationalModel.extend({
    	relations:[
    		//relation to Project
    		{
	    		type: 'HasOne',
	    		key: 'project_id',
	    		relatedModel: ProjectModel,
	    		includeInJSON: 'id',
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
    			key: 'assigned_to_id',
    			relatedModel: UserModel,
    			includeInJSON: 'id',
    			reverseRelation: {
    				tpe: 'HasMany',
    				key: 'issues',
    				relatedModel: this,
    				includeInJSON: false,
    			},
    		},
            //relation to Tracker
            {
                type: 'HasOne',
                key: 'tracker_id',
                relatedModel: TrackerModel,
                includeInJSON: 'id',
            },
            //relation to Status
            {
                type: 'HasOne',
                key: 'status_id',
                relatedModel: IssueStatusModel,
                includeInJSON: 'id',
            },
            //relation to Priority
            {
                type: 'HasOne',
                key: 'priority_id',
                relatedModel: IssuePriorityModel,
                includeInJSON: 'id',
            },
            //relation to Journal
            {
                type: 'HasMany',
                key: 'journals',
                relatedModel: JournalModel,
                collectionType: IssueJournalsCollection,
                includeInJSON: false,
            },
    	],

    	initialize: function(){

            //Set url for fetching Journals
            this.get('journals').url = Backbone.app.url+'issues/'+this.get('id');

            /*
            var project = Backbone.c.projects.get(this.get('project').id);
            this.set('project_id', project);

            var status = Backbone.c.issueStatuses.get(this.get('status').id);
            this.set('status_id', status);

            var priority = Backbone.c.issuePriorities.get(this.get('priority').id);
            this.set('priority_id', priority);

            var tracker = Backbone.c.trackers.get(this.get('tracker').id);
            this.set('tracker_id', tracker);

            //Mb user is not assigned?
            if(this.get('assigned_to')){
                var user = Backbone.c.users.get(this.get('assigned_to').id);
                this.set('assigned_to_id', user);   
            }
            */
    	},

        defaults: {
            subject: 'Insert subject',
            priority_id: 1,
            status_id: 1,
            tracker_id: 1,
            estimated_hours: 0,
            description: '',
            start_date: Date.today().toString('yyyy-MM-dd'),
        },

        parse: function(data){
            if(data.issue){
                var issue = data.issue;
                
                //Match data from server to form
                //compatible with REST API
                issue.project_id = issue.project.id;  
                issue.status_id = issue.status.id;
                issue.priority_id = issue.priority.id;
                issue.tracker_id = issue.tracker.id;

                if(issue.assigned_to)
                    issue.assigned_to_id = issue.assigned_to.id;

                return issue;
            } 
            return data;
        },

        sync: function(method, model, options){
            var options = options || {};

            //Need to change data type later
            //Thus sending new variable in which i'll store data
            //ll do that in ajaxPrefilter globally
            if(method == "create" || method == "update")
                options.redmineApiDataFix = 'issue';

            Backbone.Model.prototype.sync.call(this, method, model, options);
        },

        //Fetch with journals
        fetchWithJournals: function(options){
            if(!this.has('id')) return;

            var options = options || {};

            options.data = {include:'journals'};
            Backbone.Model.prototype.fetch.call(this, options);
        },

        //Returns json with all related models
        //Because those models ale not needed in normal JSON
        templateJSON: function(options){

            var json = Backbone.Model.prototype.toJSON.call( this, options );

            _.each( this._relations, function( rel ) {
                var related = json[ rel.key ],
                    value = null;

                if ( related && _.isFunction( related.toJSON ) ) {
                    value = related.toJSON( options );
                }

                json[ rel.keyDestination ] = value;
            });

            //Return spent time together
            json.spent_time = this.get('times').reduce(function(mem, item){return mem + item.get('hours')} ,0);

            return json;
        },
    });

    return IssueModel;
});
