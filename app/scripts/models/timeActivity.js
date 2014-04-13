/*global define*/

define([
    'underscore',
    'backbone',
    'relational'
], function (_, Backbone) {
    'use strict';

    var TimeactivityModel = Backbone.RelationalModel.extend({
        defaults: {
        }
    });

    return TimeactivityModel;
});
