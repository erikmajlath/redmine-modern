/*global define*/

define([
    'underscore',
    'backbone',
    'models/time'
], function (_, Backbone, TimeModel) {
    'use strict';

    var TimesCollection = Backbone.Collection.extend({
        model: TimeModel,

        url: 'http://localhost:3000/time_entries',

        initialize: function(){
        	dev.c.times = this;
        	
            this.on('sync', this.onReset);
            this.listenTo(Backbone.dispatcher, 'fetchComplete', this.relationDependencies);

            //Those thing gotta be fethced before making relations
            this.dep = {
                projects: false,
                users: false,
                issues: false,
                times: false,
                timeActivities: false,
            }
        },

        parse: function(data){
        	return data.time_entries;
        },

        onReset: function(){
            //Tell applicaiton that this has been fetched
            Backbone.dispatcher.trigger('fetchComplete', 'times');
        },

        relationDependencies: function(thing){
            this.dep[thing] = true;

            if(_(this.dep).chain().values().indexOf(false).value() == -1){
                this.each(function(item){
                    item.makeRelations();
                });

                Backbone.dispatcher.trigger('relationsComplete', 'times');
            }
        },

    });

    return TimesCollection;
});
