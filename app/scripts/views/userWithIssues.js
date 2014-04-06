/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/issueInUser'
], function ($, _, Backbone, JST, IssueInUserView) {
    'use strict';

    var UserwithissuesView = Backbone.View.extend({
        template: JST['app/scripts/templates/userWithIssues.ejs'],

        className: 'userWithIssues',

        initialize: function(){
        	console.log('UserWithIssues initialized!');

            this.children = _([]);
        },

        render: function(){
        	console.log('UserWithIssues rendered!');

            this.$el.html(this.template(this.model.toJSON()));
            this.renderIssues();
            return this;
        },

        renderIssues: function(){
            var fragment = $(document.createDocumentFragment());

            this.model.get('issues').each(function(item){
                var view = new IssueInUserView({model: item, parent: this});
                fragment.append(view.render().$el);
                this.children.push(view);
            }, this);

            this.$('.userList').html(fragment);
        },

        destroy: function(){
        	console.log('UserWithIssues DESTROYED - BUM!!!');

            this.children.each(function(item){
                item.destroy();
            })

            this.remove();
        },
    });

    return UserwithissuesView;
});
