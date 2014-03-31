/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var IssueModel = Backbone.Model.extend({
        defaults: {
        }
    });

    return IssueModel;
});
