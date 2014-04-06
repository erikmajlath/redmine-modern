/*global define*/

define([
    'underscore',
    'backbone',
    'relational',
], function (_, Backbone) {
    'use strict';

    var IssuepriorityModel = Backbone.RelationalModel.extend({
        defaults: {
        }
    });

    return IssuepriorityModel;
});
