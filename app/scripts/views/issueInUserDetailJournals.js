/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'date',
], function ($, _, Backbone, JST) {
    'use strict';

    var IssueinuserdetailjournalsView = Backbone.View.extend({
        template: JST['app/scripts/templates/issueInUserDetailJournals.ejs'],

        initialize: function(){
        	console.log('Issue In User Detail Journals initialzed!');

        	this.listenTo(this.collection, 'add', this.render);
        },

        render: function(){
        	console.log('Issue In User Detail Journals rendered!');

        	//No functionality required from journal. Templating whole collection
        	var data = {};
        	data.journals = this.collection.toJSON();
            data.hasId = this.options.hasId;         

            //Showing nicer data
            this.niceDate(data.journals);
            this.niceDetail(data.journals);

        	this.$el.html(this.template(data));
        	return this;
        },

        destroy: function(){
        	console.log('Issue In User Detail Journals DESTROYED - BUM!!!');

        	this.remove();
        },

        hideLoader: function(){
        	this.$('.loader').hide();
        },

        //Give colletionof journals
        niceDate: function(collection){
            var today = Date.today();
            _(collection).map(function(item){ 
                var date = Date.parse(item.created_on);

                var difference = today.getTime() - date.getTime();
                var hoursDifference = difference/1000/60/60;
                var daysDifference = hoursDifference/24;
                var monthsDifference = daysDifference/30;

                var dateText = '';

                if(hoursDifference < 20){
                    dateText = Math.ceil(hoursDifference)+' hours ago.';
                }else if(daysDifference < 25){
                    dateText = Math.ceil(daysDifference)+' days ago.';
                }else if(monthsDifference < 10){
                    dateText = Math.ceil(monthsDifference)+' months ago.';
                }else{
                    dateText = 'at '+date.toString('dS of MMMM yyyy');
                }

                item.dateText = dateText;
                return item;
            });
        },

        //Give collection of journals
        niceDetail: function(collection){
            _(collection).map(function(item){
                _(item.details).map(function(detail){
                    switch(detail.name){
                        case 'priority_id':
                            detail.name = 'priority';
                            var oldValue = Backbone.c.issuePriorities.get(detail.old_value).get('name');
                            detail.old_value = oldValue;
                            var newValue = Backbone.c.issuePriorities.get(detail.new_value).get('name');
                            detail.new_value = newValue;
                        break;
                        case 'tracker_id':
                            detail.name = 'tracker';
                            var oldValue = Backbone.c.trackers.get(detail.old_value).get('name');
                            detail.old_value = oldValue;
                            var newValue = Backbone.c.trackers.get(detail.new_value).get('name');
                            detail.new_value = newValue;
                        break;
                        case 'status_id':
                            detail.name = 'status';
                            var oldValue = Backbone.c.issueStatuses.get(detail.old_value).get('name');
                            detail.old_value = oldValue;
                            var newValue = Backbone.c.issueStatuses.get(detail.new_value).get('name');
                            detail.new_value = newValue;
                        break;
                        case 'assigned_to_id':
                            detail.name = 'asignee';
                            var oldValue = Backbone.c.users.get(detail.old_value).get('name');
                            detail.old_value = oldValue;
                            var newValue = Backbone.c.users.get(detail.new_value).get('name');
                            detail.new_value = newValue;
                        break;
                        case 'due_date':
                            detail.name = 'due date';
                        break

                    }

                    return detail
                });

                return item
            });
        },
    });

    return IssueinuserdetailjournalsView;
});
