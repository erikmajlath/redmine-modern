/*global define*/

define([
    'underscore',
    'backbone',
    'relational',
], function (_, Backbone) {
    'use strict';

    var IssuestatusModel = Backbone.RelationalModel.extend({
        defaults: {
        }
    });

    return IssuestatusModel;
});
