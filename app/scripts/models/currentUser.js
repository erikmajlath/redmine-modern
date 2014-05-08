/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var CurrentuserModel = Backbone.Model.extend({
        defaults: {
        },

        url: function(){
            return Backbone.app.url+'users/current';
        },

        initialize: function(){
        	console.log('Current user created');

            _.bindAll(this, 'projectMembersFetched');

            this.managedProjects = {};

            this.listenTo(Backbone.dispatcher, 'projectsFetched', this.managedProjectsMembersFetch);
            this.listenTo(Backbone.dispatcher, 'projectMembersFetched', this.projectMembersFetched);
        },

        parse: function(data){
            return data.user;
        },

        managedProjectsMembersFetch: function(){
            var that = this;
            //fetch all project that is current user managing
            _(this.get('memberships')).each(function(membership){
                _(membership.roles).each(function(role){
                    if(role.name == "Manager"){
                        that.managedProjects[membership.project.id] = false;
                        //Trigget fetchProject event with project id
                        Backbone.dispatcher.trigger('fetchProjectMembers', membership.project.id);
                    }
                })
            })
        },

        projectMembersFetched: function(id){
            this.managedProjects[id] = true;


            if(_(this.managedProjects).chain().values().indexOf(false).value() == -1){
                Backbone.dispatcher.trigger('usersFetched');
            }
        },
    });

    return CurrentuserModel;
});
