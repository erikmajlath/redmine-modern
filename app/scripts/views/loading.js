/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var LoadingView = Backbone.View.extend({
        template: JST['app/scripts/templates/loading.ejs'],

        initialize: function(){
        	console.log('Loading View initialized!');


        	this.listenTo(Backbone.dispatcher, 'currentUserFetched', this.currentUserFetched);
        	this.listenTo(Backbone.dispatcher, 'currentUserError', this.currentUserError);
        	this.listenTo(Backbone.dispatcher, 'currentUserUnauthorized', this.currentUserUnauthorized);

            this.listenTo(Backbone.dispatcher, 'currentUserFetched', this.currentUserFetched);
            this.listenTo(Backbone.dispatcher, 'projectsFetched', this.somethingFetched);
            this.listenTo(Backbone.dispatcher, 'issueStatusesFetched', this.somethingFetched);
            this.listenTo(Backbone.dispatcher, 'issuePrioritiesFetched', this.somethingFetched);
            this.listenTo(Backbone.dispatcher, 'trackersFetched', this.somethingFetched);
            this.listenTo(Backbone.dispatcher, 'timeActivitiesFetched', this.somethingFetched);
            this.listenTo(Backbone.dispatcher, 'issuesFetched', this.somethingFetched);

            this.listenTo(Backbone.dispatcher, 'timesFetched', this.timesFetched);



            Backbone.c.currentUser.fetch({
                data: {include: 'memberships'},
                success: function(){
                    Backbone.dispatcher.trigger('currentUserFetched');
                },
                error: function(model, response, options){
                    console.log(model);
                    console.log(response);
                    console.log(options);
                    if(response.status==0){
                        Backbone.dispatcher.trigger('currentUserUnauthorized');      
                    }else{
                        Backbone.dispatcher.trigger('currentUserError');      
                    }
                },
            });

            this.loaded = 0;

        	this.render();
        },

        render: function(){
        	console.log('Loading View rendered!');	
        	var self = this;

        	this.$el.html(this.template());
        	$('body').append(this.$el);

        	this.$('.loadingModal').modal().on('hidden.bs.modal', function () {
        	    self.destroy();
        	});

        	return this;
        },

        destroy: function(){
        	console.log('Loading View destroyed - BUM!!!');
            this.remove();
        },

        closeModal: function(){
            this.$('.loadingModal').modal('hide');
        },

        currentUserFetched: function(){
            var user = Backbone.c.currentUser;
            var username = user.get('firstname')+' '+user.get('lastname');
            this.$('.loading').show();
            this.$('.userText').html(username);
            Backbone.kanban.navigate('boardUsers', {trigger: true});
        },

        currentUserError: function(){
        	this.$('.error').show();	
        },

        currentUserUnauthorized: function(){
        	this.$('.unauthorized').show();		
        },

        somethingFetched: function(){
            this.loaded += Math.ceil(100/6);

            this.$('.progress-bar').css('width', this.loaded+'%');
        },

        timesFetched: function(){
            this.closeModal()
        },
    });

    return LoadingView;
});
