/*global require*/
'use strict';

//development debuggins purpose
var dev = {
    
    c: {},
    v: {},
    r: {},
};

require.config({
    
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        relational: {
            deps: ['backbone'],
        },
        date: {
            deps: ['jquery'],
            exports: 'Date',
        },
        datepicker: {
            deps: ['jquery'],
        },
        bootstrap: {
            deps: ['jquery'],
        },
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        relational: '../bower_components/backbone-relational/backbone-relational',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',        
        iscroll: '../bower_components/iscroll/build/iscroll',
        date: '../bower_components/datejs/build/date',
        datepicker: '../bower_components/bootstrap-datepicker/js/bootstrap-datepicker',
    }
});

require([
    'jquery',
    'backbone',
    'routes/kanban',
    'bootstrap',
], function ( $, Backbone, Kanban) {


    //Resend events to Backbone dispatcher
    window.onresize = function() { Backbone.dispatcher.trigger('resize') };

    //Global app settings
    Backbone.app = {};

    //Global url location
    Backbone.app.url = 'http://localhost:3000/';

    //Need to add .json to urls and change data structure
    //Also add header with redmine api key
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {

        //Choosing Redmine format
        options.url += '.json';
        options.crossDomain = true;
        options.headers = options.headers || {};

        _.extend(options.headers, {
            'X-Redmine-API-Key': '0d6333b04653923c31008ef0773438c682b8d673',
        })

        //When saving some models date needs to be in .data attribute
        if(options.redmineApiDataFix){
            var data = {};
            //Parse old data to JSON
            data[options.redmineApiDataFix] = JSON.parse(options.data);
            //Parse new structure to JSON
            options.data = JSON.stringify(data);
        }
    });

    var router = new Kanban(); 
});
