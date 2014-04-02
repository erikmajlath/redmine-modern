/*global define*/

define([
    'underscore',
    'backbone',
    'models/user'
], function (_, Backbone, UserModel) {
    'use strict';

    var UsersCollection = Backbone.Collection.extend({
        model: UserModel,

        url: 'http://localhost:3000/users',

        initialize: function(){
        	dev.c.users = this;
        	
            this.on('sync', this.onReset);
        },

        parse: function(data){
        	return data.users;
        },

        onReset: function(){
            //Tell applicaiton that this has been fetched
            Backbone.dispatcher.trigger('fetchComplete', 'users');
        },
    });

    return UsersCollection;
});
