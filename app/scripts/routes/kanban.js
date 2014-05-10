/*global define*/

define([
    'jquery',
    'backbone',
    'views/boardUsers',
    'views/landing',
    'models/currentUser',
    'collections/projects',
    'collections/issues',
    'collections/users',
    'collections/memberships',
    'collections/times',
    'collections/trackers',
    'collections/issueStatuses',
    'collections/issuePriorities',
    'collections/timeActivities',
], function ($, Backbone, BoardUsersView, LandingView, currentUser, projects, issues, users, memberships, times, trackers, issueStatuses, issuePriorities, timeActivities) {
    'use strict';

    var KanbanRouter = Backbone.Router.extend({
    	initialize: function(){
            console.log('Kanban Router Initialized!');

            dev.r.kanban = this;
            Backbone.kanban = this;

            //Global dispatcher! Carefuly!!! Very dangerous in future
            Backbone.dispatcher = _.clone(Backbone.Events);
            this.listenTo(Backbone.dispatcher, 'all', this.logEvent);

            //Resend events to Backbone dispatcher
            window.onresize = function() { Backbone.dispatcher.trigger('resize') };


            //Global space for collections
            Backbone.c = {};

            Backbone.c.projects = new projects();
            Backbone.c.currentUser = new currentUser();
            Backbone.c.users = new users();
            Backbone.c.memberships = new memberships();
            Backbone.c.issues = new issues();
            Backbone.c.times = new times();
            Backbone.c.trackers = new trackers();
            Backbone.c.issueStatuses = new issueStatuses();
            Backbone.c.issuePriorities = new issuePriorities();
            Backbone.c.timeActivities = new timeActivities();



            //Store current view
            this.currentView = null;

            //Starting history!!! DO THIS AFTER INITIALIZATION
            Backbone.history.start();
    	},

        routes: {
        	'': 'landing',
            'login': 'landing',
        	'boardUsers': 'boardUsers',
        },

        logEvent: function(event){
            console.log('Dispatcher event: '+event);
        },

        boardUsers: function(){
        	this.changePage(new BoardUsersView({collection: Backbone.c.users}));
        },

        changePage: function(view){
            console.log('View changed');

            //Remove current view
            if(this.currentView){
                this.currentView.destroy();
            }

            //Render our new view
            $('.main').html(view.render().el);

            //Do postRender if present
            if(view.postRender)
                view.postRender();

            //Set curent view
            this.currentView = view;
        },

        landing: function(){
            this.changePage(new LandingView());
        },
    });

    return KanbanRouter;
});
