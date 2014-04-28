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
            
            this.on('sync', this.onReset);
        },

        parse: function(data){
            return data.projects;
        },

        onReset: function(e){
            //Tell applicaiton that this has been fetched
            Backbone.dispatcher.trigger('fetchComplete', 'projects');
        },
    });

    return ProjectsCollection;
});
