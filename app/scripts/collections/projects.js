/*global define*/

define([
    'underscore',
    'backbone',
    'models/project'
], function (_, Backbone, ProjectsModel) {
    'use strict';

    var ProjectsCollection = Backbone.Collection.extend({
        model: ProjectsModel,

        url: function(){
            return Backbone.app.url+'projects';
        },

        initialize: function(){
        	dev.c.projects = this;

            this.listenTo(Backbone.dispatcher, 'currentUserFetched', this.afterCurrentUser);
        },

        parse: function(data){
            return data.projects;
        },

        afterCurrentUser: function(){
            this.fetch({
                success: function(){
                    Backbone.dispatcher.trigger('projectsFetched');
                },
            });
        },
    });

    return ProjectsCollection;
});
