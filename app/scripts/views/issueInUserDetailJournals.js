/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var IssueinuserdetailjournalsView = Backbone.View.extend({
        template: JST['app/scripts/templates/issueInUserDetailJournals.ejs'],

        initialize: function(){
        	console.log('Issue In User Detail Journals initialzed!');

        	this.listenTo(this.collection, 'add', this.render);
        },

        render: function(){
        	console.log('Issue In User Detail Journals rendered!');

        	//No functionality required from journal. Templating whole collection
        	var data = {};
        	data.journals = this.collection.toJSON();
            data.hasId = this.options.hasId;            
        	this.$el.html(this.template(data));
        	return this;
        },

        destroy: function(){
        	console.log('Issue In User Detail Journals DESTROYED - BUM!!!');

        	this.remove();
        },

        hideLoader: function(){
        	this.$('.loader').hide();
        },
    });

    return IssueinuserdetailjournalsView;
});
