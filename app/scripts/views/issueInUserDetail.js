/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'date',
    'datepicker',
], function ($, _, Backbone, JST) {
    'use strict';

    var IssueinuserdetailView = Backbone.View.extend({
        template: JST['app/scripts/templates/issueInUserDetail.ejs'],

        events: {
            //Subject editing
            'click .subject': 'editSubject',
            'click .closeSubject': 'toggleSubject',
            'click .submitSubject': 'submitSubject',
            //Tracker editing
            'click .changeTracker': 'changeTracker',
            //Status editing
            'click .changeStatus': 'changeStatus',
            //Priority editing
            'click .changePriority': 'changePriority',
            //Description Editing
            'click .changeDescription': 'changeDescription',
            'click .closeDescription': 'toggleDescription',
            'click .submitDescription': 'submitDescription',
            //Time Activity addition
            'click .addTime': 'addTime',
            'click .closeTime': 'toggleTime',
            'click .submitTime': 'submitTime',
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
            data.activities = Backbone.c.timeActivities.toJSON();

            this.$el.html(this.template(data));
        	$('body').append(this.$el);

            //Start modal
            //Also remove this when its completly hidden
            $('#issueDetail').modal().on('hidden.bs.modal', function () {
                self.destroy();
            });

            //Attach datepicker
            this.$('.dateInput').datepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
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
            this.$('.statusText').html(this.model.get('status_id').get('name'));
        },

        changePriority: function(e){
            var value = $(e.target).attr('value')
            this.model.save('priority_id', value);
        },

        renderPriority: function(){
            this.$('.priorityText').html(this.model.get('priority_id').get('name'));
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
        
        toggleTime: function(){
            this.$('.addTime').toggle();
            this.$('.timeInputWrap').toggle();
        },

        addTime: function(){
            this.toggleTime();
            this.$('.hoursInput').focus();
        },

        submitTime: function(){
            this.toggleTime();
            var hours = $('.hoursInput').val();
            var date = $('.dateInput').val();
            var activity = $('.activityInput').val();

            Backbone.c.times.create({
                project_id: this.model.get('project_id'),
                user_id: this.model.get('assigned_to_id'),
                issue_id: this.model,
                activity_id: activity,
                hours: hours,
                spent_on: date,
            });
        },

    });

    return IssueinuserdetailView;
});
