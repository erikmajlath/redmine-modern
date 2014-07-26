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

            //Development and testing values

            var cU = {"id":4,"login":"manager","firstname":"Adam","lastname":"P.","mail":"manager@shitmail.me","created_on":"2014-05-11T09:02:59Z","last_login_on":"2014-05-17T13:02:19Z","api_key":"ed763b485652e44d44b3b838f22c48b83632e1ca","memberships":[{"id":2,"project":{"id":2,"name":"IS"},"roles":[{"id":3,"name":"Manager"}]}]};
            var pr = [{"id":1,"name":"Bechalor thesis","identifier":"bechalor-thesis","description":"wow. sound interesting.","created_on":"2014-03-18T18:46:46Z","updated_on":"2014-03-18T18:46:46Z"},{"id":2,"name":"IS","identifier":"is","description":"Informacny system Masarykovej Univerzity","created_on":"2014-05-11T09:31:47Z","updated_on":"2014-05-11T09:31:47Z"}];
            var tr = [{"id":1,"name":"Bug"},{"id":2,"name":"Feature"},{"id":3,"name":"Support"}];
            var iS = [{"id":1,"name":"New","is_default":true},{"id":2,"name":"In Progress"},{"id":3,"name":"Resolved"},{"id":4,"name":"Feedback"},{"id":5,"name":"Closed","is_closed":true},{"id":6,"name":"Rejected","is_closed":true}];
            var iP = [{"id":1,"name":"Low"},{"id":2,"name":"Normal","is_default":true},{"id":3,"name":"High"},{"id":4,"name":"Urgent"},{"id":5,"name":"Immediate"}];
            var tA = [{"id":8,"name":"Design"},{"id":9,"name":"Development"}];
            var pr2m = [{"id":2,"project":{"id":2,"name":"IS"},"user":{"id":4,"name":"Adam P."},"roles":[{"id":3,"name":"Manager"}]},{"id":3,"project":{"id":2,"name":"IS"},"user":{"id":3,"name":"Erik M"},"roles":[{"id":4,"name":"Developer"}]},{"id":4,"project":{"id":2,"name":"IS"},"user":{"id":5,"name":"Martin S"},"roles":[{"id":4,"name":"Developer"}]}];
            var iss = [{"id":12,"project":{"id":2,"name":"IS"},"tracker":{"id":1,"name":"Bug"},"status":{"id":1,"name":"New"},"priority":{"id":1,"name":"Low"},"author":{"id":4,"name":"Adam P."},"assigned_to":{"id":4,"name":"Adam P."},"subject":"dfsfs","description":"","start_date":"2014-06-13","done_ratio":0,"created_on":"2014-06-13T10:19:51Z","updated_on":"2014-06-13T10:19:51Z"},{"id":11,"project":{"id":2,"name":"IS"},"tracker":{"id":3,"name":"Support"},"status":{"id":1,"name":"New"},"priority":{"id":1,"name":"Low"},"author":{"id":4,"name":"Adam P."},"assigned_to":{"id":4,"name":"Adam P."},"subject":"Insert subject","description":"","start_date":"2014-05-27","done_ratio":0,"created_on":"2014-05-27T13:27:18Z","updated_on":"2014-05-27T13:27:18Z"},{"id":10,"project":{"id":2,"name":"IS"},"tracker":{"id":1,"name":"Bug"},"status":{"id":1,"name":"New"},"priority":{"id":1,"name":"Low"},"author":{"id":4,"name":"Adam P."},"assigned_to":{"id":4,"name":"Adam P."},"subject":"Insert subject3","description":"","start_date":"2014-05-14","done_ratio":0,"created_on":"2014-05-14T14:11:07Z","updated_on":"2014-05-14T14:11:07Z"},{"id":9,"project":{"id":2,"name":"IS"},"tracker":{"id":1,"name":"Bug"},"status":{"id":1,"name":"New"},"priority":{"id":1,"name":"Low"},"author":{"id":4,"name":"Adam P."},"assigned_to":{"id":4,"name":"Adam P."},"subject":"Pokus","description":"Popis","start_date":"2014-05-14","done_ratio":0,"created_on":"2014-05-14T14:11:01Z","updated_on":"2014-05-27T13:28:08Z"},{"id":8,"project":{"id":2,"name":"IS"},"tracker":{"id":2,"name":"Feature"},"status":{"id":2,"name":"In Progress"},"priority":{"id":2,"name":"Normal"},"author":{"id":4,"name":"Adam P."},"assigned_to":{"id":5,"name":"Martin S"},"subject":"Forum","description":"Desc","start_date":"2014-05-14","done_ratio":0,"created_on":"2014-05-14T14:08:29Z","updated_on":"2014-05-14T14:09:13Z"},{"id":3,"project":{"id":2,"name":"IS"},"tracker":{"id":2,"name":"Feature"},"status":{"id":2,"name":"In Progress"},"priority":{"id":2,"name":"Normal"},"author":{"id":4,"name":"Adam P."},"assigned_to":{"id":4,"name":"Adam P."},"subject":"Very interesting subject","description":"Blablbal","start_date":"2014-05-12","done_ratio":0,"created_on":"2014-05-12T14:26:20Z","updated_on":"2014-06-13T10:19:28Z"},{"id":1,"project":{"id":2,"name":"IS"},"tracker":{"id":1,"name":"Bug"},"status":{"id":2,"name":"In Progress"},"priority":{"id":3,"name":"High"},"author":{"id":4,"name":"Adam P."},"assigned_to":{"id":3,"name":"Erik M"},"subject":"System crash","description":"System crash at 17:00 on monday","start_date":"2014-05-11","due_date":"2014-05-20","done_ratio":0,"created_on":"2014-05-11T09:52:12Z","updated_on":"2014-06-13T10:20:18Z"}];
            var tE = [{"id":2,"project":{"id":2,"name":"IS"},"issue":{"id":3},"user":{"id":4,"name":"Adam P."},"activity":{"id":8,"name":"Design"},"hours":20.0,"comments":"ghfghj","spent_on":"2014-06-13","created_on":"2014-06-13T10:19:14Z","updated_on":"2014-06-13T10:19:14Z"},{"id":1,"project":{"id":2,"name":"IS"},"issue":{"id":9},"user":{"id":4,"name":"Adam P."},"activity":{"id":8,"name":"Design"},"hours":5.0,"comments":"Makal jsem na tom","spent_on":"2014-05-27","created_on":"2014-05-27T13:28:21Z","updated_on":"2014-05-27T13:28:21Z"}];
            



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
            if(typeof Backbone.app.url === 'undefined'){
                Backbone.kanban.navigate('', {trigger: true});
            }else{
                this.changePage(new BoardUsersView({collection: Backbone.c.users}));    
            }
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
