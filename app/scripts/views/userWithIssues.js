/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/issue',
    'views/issueInUser',
    'views/issueInUserDetail',
], function ($, _, Backbone, JST, IssueModel, IssueInUserView, issueInuserDetailView) {
    'use strict';

    var UserwithissuesView = Backbone.View.extend({
        template: JST['app/scripts/templates/userWithIssues.ejs'],

        className: 'userWithIssues well well-sm',

        events: {
            'click .addIssue': 'toggleIssueInput',
            'click .issueSubmit': 'createIssue',
            'click .issueInputClose': 'toggleIssueInput',
        },

        initialize: function(){
        	console.log('UserWithIssues initialized!');

            this.listenTo(this.model.get('issues'), 'add remove', this.renderIssues);
            this.listenTo(Backbone.dispatcher, 'resize', this.windowResize);

            this.children = _([]);

        },

        render: function(){
        	console.log('UserWithIssues rendered!');

            var data = this.model.toJSON();
            data.userProjects = this.model.get('memberships').pluck('project');

            this.$el.html(this.template(data));
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

        toggleIssueInput: function(){
            this.$('.addIssue').toggle();
            this.$('.issueInputWrap').toggle();
            this.windowResize();
        },

        createIssue: function(){
            this.toggleIssueInput();
            var project_id = this.$('.issueProjectInput').val();
            var assigned_to_id = this.model.get('id');
            var issue = new IssueModel({
                project_id: project_id,
                assigned_to_id: assigned_to_id,
            });

            var view = new issueInuserDetailView({model: issue});
        },

        windowResize: function(){
            var windowH = $(window).height();
            var headerH = this.$el.find('.userHeader').height();
            var footerH = this.$el.find('.userFooter').height();

            this.$('.userList').css('max-height', windowH - headerH - footerH - 105);
        },
    });

    return UserwithissuesView;
});
