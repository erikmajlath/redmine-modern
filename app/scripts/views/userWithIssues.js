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

        events: {
            'click .addIssue': 'showIssueInput',
            'click .issueSubmit': 'createIssue',
            'click .issueInputClose': 'hideIssueInput',
        },

        initialize: function(){
        	console.log('UserWithIssues initialized!');

            this.listenTo(this.model.get('issues'), 'add remove', this.renderIssues);

            this.children = _([]);
        },

        render: function(){
        	console.log('UserWithIssues rendered!');

            this.$el.html(this.template(this.model.toJSON()));
            this.renderIssues();
            return this;
        },

        renderIssues: function(){

            //Memory leak
            //Destroy issues before rendering if any in children

            var fragment = $(document.createDocumentFragment());
            var issues = this.model.get('issues').sortBy(function(item){
                return -parseInt(item.get('priority_id').get('id'));
            });
            _(issues).each(function(item){
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

        hideIssueInput: function(){
            this.$('.addIssue').show();
            this.$('.issueInputWrap').hide();
        },

        showIssueInput: function(){
            this.$('.addIssue').hide();
            this.$('.issueInputWrap').show();
            this.$('.issueInput').focus();
        },

        createIssue: function(){
            this.hideIssueInput();
            Backbone.c.issues.create({subject: this.$('.issueInput').val(), assigned_to_id: this.model.get('id')});
        },
    });

    return UserwithissuesView;
});
