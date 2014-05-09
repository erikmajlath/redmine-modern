/*global define*/

define([
    'jquery',
    'backbone',
    'views/boardUsers',
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
], function ($, Backbone, BoardUsersView, currentUser, projects, issues, users, memberships, times, trackers, issueStatuses, issuePriorities, timeActivities) {
    'use strict';

    var KanbanRouter = Backbone.Router.extend({
    	initialize: function(){
            console.log('Kanban Router Initialized!');

            dev.r.kanban = this;

            //Global dispatcher! Carefuly!!! Very dangerous in future
            Backbone.dispatcher = _.clone(Backbone.Events);
            this.listenTo(Backbone.dispatcher, 'all', this.logEvent);


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


            //Load order current user > projects > project members > issues > times

            //fetch currents user with membership
            Backbone.c.currentUser.fetch({
                data: {include: 'memberships'},
                success: function(){
                    Backbone.dispatcher.trigger('currentUserFetched');
                },
            });

            /*
                        Backbone.c.users.fetch();
            Backbone.c.issues.fetch();
            Backbone.c.times.fetch();

            */
            //This can be loaded without waiting
            Backbone.c.trackers.fetch();
            Backbone.c.issueStatuses.fetch();
            Backbone.c.issuePriorities.fetch();
            Backbone.c.timeActivities.fetch();
            

            
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
            $('main').html(view.render().el);

            //Do postRender if present
            console.log(view.postRender);
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
