/*global define*/

define([
    'underscore',
    'backbone',
    'relational',
], function (_, Backbone, Relational) {
    'use strict';

    var UserModel = Backbone.RelationalModel.extend({

        defaults: {
        }
    });

    return UserModel;
});
