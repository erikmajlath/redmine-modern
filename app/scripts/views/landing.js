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
            'click .setTesting': 'setTesting',
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

        setTesting: function(){
            var apiKey = 'ed763b485652e44d44b3b838f22c48b83632e1ca';
            var url = 'redmine.majlath.org';

            this.$('.redmineUrlInput').val(url);
            this.$('.apiKeyInput').val(apiKey);
        },

        tryConnect: function(){
            //Do some test agains url
            var url = this.$('.redmineUrlInput').val();

            var isUrl = /^http:\/\//;
            if(!isUrl.test(url)){
                url= 'http://'+url;
            }

            var endWithSlash = /\/$/
            if(!endWithSlash.test(url)){
                url+= '/';
            }

            //Update url in interface
            this.$('.redmineUrlInput').val(Backbone.app.url);

            //Set globally
            Backbone.app.apiKey = this.$('.apiKeyInput').val();
            Backbone.app.url = url;

            //Try to connect
            new LoadingView();
        },
    });

    return LandingView;
});
