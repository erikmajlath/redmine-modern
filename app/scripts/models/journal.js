/*global define*/

define([
    'underscore',
    'backbone',
    'relational',
    'date',
], function (_, Backbone) {
    'use strict';

    var JournalModel = Backbone.RelationalModel.extend({
        
        defaults: {
        },

        initialize: function(){
        },
    });

    return JournalModel;
});
