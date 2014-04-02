/*global define*/

define([
    'underscore',
    'backbone',
    'relational',
], function (_, Backbone) {
    'use strict';

    var ProjectModel = Backbone.RelationalModel.extend({
        defaults: {
        }
    });

    return ProjectModel;
});
