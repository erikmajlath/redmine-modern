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
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        relational: '../bower_components/backbone-relational/backbone-relational',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',        
        iscroll: '../bower_components/iscroll/build/iscroll',
        date: '../bower_components/datejs/build/date',
    }
});

require([
    'jquery',
    'backbone',
    'routes/kanban',
], function ( $, Backbone, Kanban) {


    //Resend events to Backbone dispatcher
    window.onresize = function() { Backbone.dispatcher.trigger('resize') };

    //Applying Bootstrap collapse
    require(['bootstrap'], function(collapse){

    });

    //Need to add .json to urls and change data structure
    //Also add header with redmine api key
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {

        options.url += '.json';
        options.crossDomain = true;
        options.headers = options.headers || {};

        _.extend(options.headers, {
            'X-Redmine-API-Key': '3254777eb1db0be4c3e0bbf30236b29d8a87f11e',
        })

        //If data need fix?
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
