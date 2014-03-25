/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ProjectsissuesView = Backbone.View.extend({
        template: JST['app/scripts/templates/projectsIssues.ejs'],

        initialize: function(){
        	console.log('Projects & Issues view initialized!');
        },

        render: function(){
        	this.$el.html(this.template());
        	return this;
        },

        destroy: function(){
        	console.log('Projects & Issues view DESTROYED - BUM!!!!');	
        	this.remove();
        },
    });

    return ProjectsissuesView;
});
