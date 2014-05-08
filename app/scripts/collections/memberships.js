/*global define*/

define([
    'underscore',
    'backbone',
    'models/membership'
], function (_, Backbone, MembershipModel) {
    'use strict';

    var MembershipsCollection = Backbone.Collection.extend({
        model: MembershipModel,

        initialize: function(){
        	dev.c.memberships = this;

        	this.listenTo(Backbone.dispatcher, 'fetchProjectMembers', this.fetchProjectMembers);
        },

        fetchProjectMembers: function(id){
            var that = this;
            $.ajax({
                type: 'GET',
                url: Backbone.app.url+'projects/'+id+'/memberships',
                success: function(data){

                	//get users and modify memberships
                	var users = _(data.memberships).reduce(function(mem, item){
                		mem.push(item.user);
                		item.user = item.user.id;
                		return mem;
                	}, []);

                	//create new users
                	Backbone.c.users.add(users);

                	//add memberships
                	//not needed but mb in future
                    that.add(data.memberships);

                    //Tell application
                    Backbone.dispatcher.trigger('projectMembersFetched', id);
                },
            });
        },
    });

    return MembershipsCollection;
});
