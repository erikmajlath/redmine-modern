/*global define*/

define([
    'underscore',
    'backbone',
    'relational',
], function (_, Backbone) {
    'use strict';

    var IssuepriorityModel = Backbone.RelationalModel.extend({
        defaults: {
        	r: '192',
            g: '57',
            b: '43',
            color: 'rgba(192, 57, 43, 1.0)',
        },

        initialize: function(){
            this.listenTo(this, 'change:opacity', this.setRGBA);
        },

        setRGBA: function(){
            var r = this.get('r');
            var g = this.get('g');
            var b = this.get('b');
            var o = this.get('opacity');
            this.set('color', 'rgba('+r+','+g+','+b+','+o+')');
        },

    });

    return IssuepriorityModel;
});
