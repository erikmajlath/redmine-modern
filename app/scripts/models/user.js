/*global define*/

define([
    'underscore',
    'backbone',
    'models/membership',
    'relational',
], function (_, Backbone, MembershipModel) {
    'use strict';

    var UserModel = Backbone.RelationalModel.extend({

        defaults: {
        },

        relations: [
            {
            type: 'HasMany',
            key: 'memberships',
            relatedModel: MembershipModel,
                reverseRelation: {
                    key: 'user'
                }
            }
        ],
    });

    return UserModel;
});
