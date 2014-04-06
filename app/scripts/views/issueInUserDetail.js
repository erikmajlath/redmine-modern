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
        },

        initialize: function(){
        	console.log('Issue In User Detail initialzed!');
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

/*
        submit: function(e){
            console.log('SUBMIT');
            e.preventDefault();
            var data = this.serialize();
            this.model.save(data);

            this.closeModal();
        },

        serialize: function(){
            var o = {};
            var a = this.$('.issueDetailForm').serializeArray();
            $.each(a, function() {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        },*/

        
    });

    return IssueinuserdetailView;
});
