/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var IssueinuserdetailView = Backbone.View.extend({
        template: JST['app/scripts/templates/issueInUserDetail.ejs'],

        events: {
            'click .subject': 'editSubject',
            'click .closeSubject': 'toggleSubject',
            'click .submitSubject': 'submitSubject',
            'click .changeTracker': 'changeTracker',
            'click .changeStatus': 'changeStatus',
            'click .changePriority': 'changePriority',
            'click .changeDescription': 'changeDescription',
            'click .closeDescription': 'toggleDescription',
            'click .submitDescription': 'submitDescription',
        },

        initialize: function(){
        	console.log('Issue In User Detail initialzed!');

            //Listen to change events
            this.listenTo(this.model, 'change:subject', this.renderSubject);
            this.listenTo(this.model, 'change:tracker_id', this.renderTracker);
            this.listenTo(this.model, 'change:status_id', this.renderStatus);
            this.listenTo(this.model, 'change:priority_id', this.renderPriority);

            this.render();
        },

        render: function(){
        	console.log('Issue In User Detail rendered!');
            var self = this;

            var data = this.model.templateJSON();
            data.trackers = Backbone.c.trackers.toJSON();
            data.issueStatuses = Backbone.c.issueStatuses.toJSON();
            data.issuePriorities = Backbone.c.issuePriorities.toJSON();

            this.$el.html(this.template(data));
        	$('body').append(this.$el);

            //Start modal
            //Also remove this when its completly hidden
            $('#issueDetail').modal().on('hidden.bs.modal', function () {
                self.destroy();
            });

        	return this;
        },
        
        closeModal: function(){
            this.$('#issueDetail').modal('hide');
        },

        destroy: function(){
        	console.log('Issue In User Detail DESTROYED - BUM!!!');
            $('#issueDetail').remove();
        	this.remove();
        },

        editSubject: function(){
            this.toggleSubject();
            this.$('.subjectInput').focus();

        },

        toggleSubject: function(){
            this.$('.subject').toggle();
            this.$('.subjectInputWrap').toggle();
        },

        submitSubject: function(){
            this.toggleSubject();
            var input = this.$('.subjectInput').val();
            this.model.save('subject', input);
        },

        renderSubject: function(){
            this.$('.subject').show().html(this.model.get('subject'));
        },

        changeTracker: function(e){
            var value = $(e.target).attr('value')
            this.model.save('tracker_id', value);
        },

        renderTracker: function(){
            this.$('.trackerText').html(this.model.get('tracker_id').get('name'));
        },

        changeStatus: function(e){
            var value = $(e.target).attr('value')
            this.model.save('status_id', value);
        },

        renderStatus: function(){
            this.$('.status').html(this.model.get('status_id').get('name'));
        },

        changePriority: function(e){
            var value = $(e.target).attr('value')
            this.model.save('priority_id', value);
        },

        renderPriority: function(){
            this.$('.priority').html(this.model.get('priority_id').get('name'));
        },

        toggleDescription: function(){
            this.$('.changeDescription').toggle();
            this.$('.descriptionInputWrap').toggle();
        },

        changeDescription: function(){
            this.toggleDescription();
            this.$('.descriptionInput').focus();
        },

        submitDescription: function(){
            this.toggleDescription();
            var input = this.$('.descriptionInput').val();
            this.model.save('description', input);
        },
        
    });

    return IssueinuserdetailView;
});
