/*global define*/

define([
    'jquery',
    'backbone',
    'views/boardUsers',
    'views/boardProjects',
    'collections/projects',
    'collections/issues',
    'collections/users',
    'collections/times',
    'collections/trackers',
    'collections/issueStatuses',
    'collections/issuePriorities',
], function ($, Backbone, BoardUsersView, BoardProjectsView, projects, issues, users, times, trackers, issueStatuses, issuePriorities) {
    'use strict';

    var KanbanRouter = Backbone.Router.extend({
    	initialize: function(){
            console.log('Kanban Router Initialized!');

            dev.r.kanban = this;

            //Global dispatcher! Carefuly!!! Very dangerous in future
            Backbone.dispatcher = _.clone(Backbone.Events);

            //Global space for collections
            Backbone.c = {};

            Backbone.c.projects = new projects();
            Backbone.c.users = new users();
            Backbone.c.issues = new issues();
            Backbone.c.times = new times();
            Backbone.c.trackers = new trackers();
            Backbone.c.issueStatuses = new issueStatuses();
            Backbone.c.issuePriorities = new issuePriorities();

            //Store current view
            this.currentView = null;

            //Starting history!!! DO THIS AFTER INITIALIZATION
            Backbone.history.start();

            //Fetch all
            Backbone.c.projects.fetch();
            Backbone.c.users.fetch();
            Backbone.c.issues.fetch();
            Backbone.c.times.fetch();
            Backbone.c.trackers.fetch();
            Backbone.c.issueStatuses.fetch();
            Backbone.c.issuePriorities.fetch();

            this.listenTo(Backbone.dispatcher, 'relationsComplete', this.relationsComplete);

            //Models with relations
            //Need to wait till fully loaded and raltioned
            this.relations = {
                issues: false,
                times: false,
            };
    	},

        routes: {
        	'': 'boardUsers',
        	'boardUsers': 'boardUsers',
            'boardProjects': 'boardProjects',
        },

        boardUsers: function(){
        	this.changePage(new BoardUsersView({collection: Backbone.c.users}));
        },

        boardProjects: function(){
        	this.changePage(new BoardProjectsView());
        },

        changePage: function(view){
            console.log('changePage');

            //Remove current view
            if(this.currentView){
                this.currentView.destroy();
            }

            //Render our new view
            $('main').html(view.render().el);

            //Do postRender if present
            if(view.postRender)
                view.postRender();

            //Set curent view
            this.currentView = view;
        },

        relationsComplete: function(item){
            this.relations[item] = true;

            if(this.relations.issues && this.relations.times){
                Backbone.dispatcher.trigger('collectionsFetched');
            }
        }
    });

    return KanbanRouter;
});
