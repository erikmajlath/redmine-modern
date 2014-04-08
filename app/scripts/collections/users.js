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
            this.listenTo(Backbone.dispatcher, 'fetchComplete', this.relationDependencies);
            
            this.dep = {
                projects: false,
            }
        },

        parse: function(data){
        	return data.users;
        },

        onReset: function(){
            //Tell applicaiton that this has been fetched
            Backbone.dispatcher.trigger('fetchComplete', 'users');
        },

        relationDependencies: function(thing){
            this.dep[thing] = true;

            if(_(this.dep).chain().values().indexOf(false).value() == -1){
                this.each(function(item){
                    item.makeRelations();
                });

                Backbone.dispatcher.trigger('relationsComplete', 'users');
            }
        },
    });

    return UsersCollection;
});
