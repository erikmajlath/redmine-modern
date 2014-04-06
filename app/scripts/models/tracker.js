/*global define*/

define([
    'underscore',
    'backbone',
    'relational',
], function (_, Backbone) {
    'use strict';

    var TrackerModel = Backbone.RelationalModel.extend({
        defaults: {
        }
    });

    return TrackerModel;
});
