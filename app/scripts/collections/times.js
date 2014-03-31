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
        	this.fetch();
        },

        parse: function(data){
        	return data.time_entries;
        },
    });

    return TimesCollection;
});
