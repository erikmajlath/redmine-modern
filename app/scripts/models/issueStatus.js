/*global define*/

define([
    'underscore',
    'backbone',
    'relational',
], function (_, Backbone) {
    'use strict';

    var IssuestatusModel = Backbone.RelationalModel.extend({

        defaults: {
        },

        initialize: function(){
        	this.setColor();
        },

        setColor: function(){

        	// Closed means gray
        	if(this.get('is_closed')){
        		this.set('color', '#7f8c8d');
        	}

        	var name = this.get('name');

        	//In progres means green
        	if(name == "In Progress"){
        		this.set('color', '#27ae60');
        	}

        	if(name == "Feedback"){
        		this.set('color', '#f39c12');
        	}
        },
    });

    return IssuestatusModel;
});
