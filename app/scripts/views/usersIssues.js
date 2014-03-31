/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var UsersissuesView = Backbone.View.extend({
        template: JST['app/scripts/templates/usersIssues.ejs'],

        initialize: function(){
        	console.log('User & Issues view initliazed!');
            this.collection = Backbone.c.projects;

            this.listenTo(this.collection, 'reset add remove', this.renderContent);
        },

        render: function(){
        	this.$el.html(this.template());
            //this.renderContent();
        	return this;
        },

        renderContent: function(){
            var tpl = ' <ul data-role="listview" class="projectsList"><% _.each(projects, function(project){ %><li><%= project.name %></li><% }) %></ul>';
            this.$('.content').html(_.template(tpl, {projects: this.collection.toJSON()}));
        },

        destroy: function(){
            console.log('Users & Issues view DESTROYED - BUM!!!!');  
            this.remove();
        },
    });

    return UsersissuesView;
});
