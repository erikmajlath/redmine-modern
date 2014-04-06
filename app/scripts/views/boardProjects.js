/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var BoardProjectsView = Backbone.View.extend({
        template: JST['app/scripts/templates/boardProjects.ejs'],

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

    return BoardProjectsView;
});
