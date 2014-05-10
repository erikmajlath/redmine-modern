/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/loading',
    'templates'
], function ($, _, Backbone, LoadingView) {
    'use strict';

    var LandingView = Backbone.View.extend({
        template: JST['app/scripts/templates/landing.ejs'],

        events:{
            'click .tryConnect': 'tryConnect',
            'keyup .redmineUrlInput': 'setRedmineUrl',
            'keyup .apiKeyInput': 'setApiKey',
        },

        initialize: function(){
        	console.log('Landing View initialized!');


        },

        render: function(){
        	this.$el.html(this.template());

        	return this;
        },

        destroy: function(){
        	console.log('Landing View destroyed - BUMM!!!');
        	this.remove();
        },

        setRedmineUrl: function(){
            Backbone.app.url = this.$('.redmineUrlInput').val();
        },

        setApiKey: function(){
        	Backbone.app.apiKey = this.$('.apiKeyInput').val();
        },

        tryConnect: function(){
            var url = Backbone.app.url;

            var isUrl = /^http:\/\//;
            if(!isUrl.test(url)){
                Backbone.app.url = 'http://'+Backbone.app.url;
            }

            var endWithSlash = /\/$/
            if(!endWithSlash.test(url)){
                Backbone.app.url+= '/';
            }

            this.$('.redmineUrlInput').val(Backbone.app.url);

            new LoadingView();
        },
    });

    return LandingView;
});
