/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/issueInUserDetail'
], function ($, _, Backbone, JST, details) {
    'use strict';

    var IssueinuserView = Backbone.View.extend({
        template: JST['app/scripts/templates/issueInUser.ejs'],

        className: 'issueInUser',

        events:{
            'click .issueHeader': 'showDetails',
        },

        initialize: function(){
        	console.log('IssueInUser initialized!');
        },

        render: function(){
        	console.log('IssueInUser rendered!');

            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        destroy: function(){
        	console.log('IssueInUser DESTROYED - BUM!!!');
        	this.remove();
        },

        showDetails: function(){
            var view = new details({model: this.model});
        },
    });

    return IssueinuserView;
});
