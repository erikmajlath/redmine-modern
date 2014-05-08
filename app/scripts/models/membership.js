/*global define*/

define([
    'underscore',
    'backbone',
    'relational',
], function (_, Backbone) {
    'use strict';

    var MembershipModel = Backbone.RelationalModel.extend({
        defaults: {
        }
    });

    return MembershipModel;
});
