/*global define*/

define([
    'underscore',
    'backbone',
    'models/journal'
], function (_, Backbone, JournalModel) {
    'use strict';

    var IssuejournalsCollection = Backbone.Collection.extend({
        model: JournalModel,

        initialize: function(){
        },
    });

    return IssuejournalsCollection;
});
