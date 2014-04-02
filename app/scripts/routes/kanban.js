/*global define*/

define([
    'jquery',
    'backbone',
    'views/usersIssues',
    'views/projectsIssues',
    'collections/projects',
    'collections/issues',
    'collections/users',
    'collections/times',
], function ($, Backbone,userIssues, projectsIssues, projects, issues, users, times) {
    'use strict';

    var KanbanRouter = Backbone.Router.extend({
    	initialize: function(){
            console.log('Kanban Router Initialized!');
    		
            //Global dispatcher! Carefuly!!! Very dangerous in future
            Backbone.dispatcher = _.clone(Backbone.Events);

            //For dev purposes
            this.listenTo(Backbone.dispatcher, 'all', this.showEvent); 

            //Global space for collections
            Backbone.c = {};

            Backbone.c.projects = new projects();
            Backbone.c.users = new users();
            Backbone.c.issues = new issues();
            Backbone.c.times = new times();

            //Fetch all
            Backbone.c.projects.fetch();
            Backbone.c.users.fetch();
            Backbone.c.issues.fetch();
            Backbone.c.times.fetch();

            //Starting history!!! DO THIS AFTER INITIALIZATION
            Backbone.history.start();

            //Store current view
            this.currentView = null;
    	},

        routes: {
        	'': 'usersIssues',
        	'usersIssues': 'usersIssues',
            'projectsIssues': 'projectsIssues',
        },

        usersIssues: function(){
        	this.changePage(new userIssues());
        },

        projectsIssues: function(){
        	this.changePage(new projectsIssues());
        },

        changePage:function (_view) {
            var self = this;
            var view = _view;

            //Remove current view
            if(this.currentView)
                this.currentView.destroy();

            //Render our new view
            view.setElement($('main')).render();
        },

        showEvent: function(e,v){
            console.log(e + v);
        },
    });

    return KanbanRouter;
});
