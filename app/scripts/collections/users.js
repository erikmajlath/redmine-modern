/*global define*/

define([
    'underscore',
    'backbone',
    'models/user',
    'models/currentUser',
], function (_, Backbone, UserModel, CurrentUserModel) {
    'use strict';

    var UsersCollection = Backbone.Collection.extend({
        model: UserModel,        

        url: function(){
            return Backbone.app.url+'users';
        },

        initialize: function(){
        	dev.c.users = this;
        },

        parse: function(data){
        	return data.users;
        },

    });

    return UsersCollection;
});
