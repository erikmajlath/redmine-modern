/*global define*/

define([
    'underscore',
    'backbone',
    'models/membership',
    'relational',
], function (_, Backbone, MembershipModel) {
    'use strict';

    var ProjectModel = Backbone.RelationalModel.extend({
        defaults: {
        },

        relations: [
        	{
        	type: 'HasMany',
        	key: 'members',
        	relatedModel: MembershipModel,
        	    reverseRelation: {
        	        key: 'project'
        	    }
        	}
        ],

        initialize: function(){
            console.log('Project '+this.get('identifier')+' created');
        },
    });

    return ProjectModel;
});
