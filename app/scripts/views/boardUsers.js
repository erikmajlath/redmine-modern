/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'iscroll',
    'views/userWithIssues'
], function ($, _, Backbone, JST, iscroll, UserWithIssuesView) {
    'use strict';

    var BoardUsersView = Backbone.View.extend({
        template: JST['app/scripts/templates/boardUsers.ejs'],

        initialize: function(){
        	console.log('User & Issues view initliazed!');

            this.collection = Backbone.c.users;

            //Times are last part of loading process, we can start rendering right after
            Backbone.dispatcher.once('timesFetched', this.renderContent, this);
            this.listenTo(Backbone.dispatcher, 'resize', this.windowResize);

            this.children = _([]);
        },

        render: function(){
            console.log('User & Issues view rendered!');
        	this.$el.html(this.template());

            this.renderContent();

        	return this;
        },

        renderContent: function(){

            //If collection is empty
            if(this.collection.length == 0) return this;

            //Adjust width
            this.$('.list').css('width', (this.collection.length+1)*250);

            //Create empty element
            var fragment = $(document.createDocumentFragment());

            this.collection.each(function(item){
                var view = new UserWithIssuesView({model: item, parent: this});
                this.children.push(view);
                fragment.append(view.render().$el);
            }, this);

            //append element
            this.$('.list').html(fragment);

            this.postRender();
        },

        postRender: function(){
            //Add iscroll, need to add it after DOM is loaded
            if(this.iscroll)
                this.iscroll.destroy();

            if($('.listWrap').length)
                this.iscroll = new IScroll('.listWrap', {scrollX: true, scrollY: false});

            //Adjust height
            Backbone.dispatcher.trigger('resize');
        },

        destroy: function(){
            console.log('Users & Issues view DESTROYED - BUM!!!!');  

            this.children.each(function(item){
                item.destroy();   
            })

            this.remove();
        },

        windowResize: function(){
            //New window height
            var windowH = $(window).height();

            //Set board height
            this.$('.boardContainer').css('height', windowH - 75);
        },
    });

    return BoardUsersView;
});
