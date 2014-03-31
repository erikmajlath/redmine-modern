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
], function ($, Backbone, userIssues, projectsIssues, projects, issues, users, times) {
    'use strict';

    var KanbanRouter = Backbone.Router.extend({
    	initialize: function(){
            console.log('Kanban Router Initialized!');
    		
            //Global space for collections
            Backbone.c = {};

            Backbone.c.projects = new projects();
            Backbone.c.issues = new issues();
            Backbone.c.users = new users();
            Backbone.c.times = new times();

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
        }
    });

    return KanbanRouter;
});
