/*global require*/
'use strict';

//development debuggins purpose
var dev = {
    
    c: {},
    v: {},
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
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        relational: '../bower_components/backbone-relational/backbone-relational',
        underscore: '../bower_components/underscore/underscore',
        bscollapse: '../bower_components/bootstrap/js/collapse',
    }
});

require([
    'jquery',
    'backbone',
    'routes/kanban',
], function ( $, Backbone, Kanban) {
    
    require(['bscollapse'], function(collapse){

    });

    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
        options.url += '.json';
        options.crossDomain = true;
        options.headers = options.headers || {};

        _.extend(options.headers, {
            'X-Redmine-API-Key': '3254777eb1db0be4c3e0bbf30236b29d8a87f11e',
        })
    });

    var router = new Kanban(); 
});
