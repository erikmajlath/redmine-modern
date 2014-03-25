/*global define*/

define([
    'jquery',
    'backbone',
    'views/usersIssues',
    'views/projectsIssues',
    'collections/projects',
], function ($, Backbone, userIssues, projectsIssues, projects) {
    'use strict';

    var KanbanRouter = Backbone.Router.extend({
    	initialize: function(){
            console.log('Kanban Router Initialized!');
    		
            this.projects = new projects();

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
        	this.changePage(new userIssues({collection: this.projects}));
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
            view.setElement($('body')).render();
        }
    });

    return KanbanRouter;
});
