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
        	return 'http://localhost:3000/projects';
        },

        initialize: function(){
        	dev.c.projects = this;
            this.fetch();
        },

        parse: function(data){
            return data.projects;
        }
    });

    return ProjectsCollection;
});
