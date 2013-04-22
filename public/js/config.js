// Use ECMAScript 5 Strict Mode
"use strict";

//over-ride the default requireJS error handler with something a bit more useful
// require.onError = function (err) {
//     console.error('Unable to loads module(s): ', err.requireModules);
//     require.undef(err.requireModules); //this might be an array?
//     console.log('Here are some more details: ', err);
// };

var require = {
    paths: {
        templates            : '../templates',
        lib                  : '../lib',
        jquery               : '../lib/jquery/jquery-1.7.1.min',
        jqueryUICore         : '../lib/jquery-ui/jquery.ui.core',
        jqueryUIWidget       : '../lib/jquery-ui/jquery.ui.widget',
        jqueryUIMouse        : '../lib/jquery-ui/jquery.ui.mouse',
        jqueryUIPosition     : '../lib/jquery-ui/jquery.ui.position',
        jqueryUIAutocomplete : '../lib/jquery-ui/jquery.ui.autocomplete',
        jqueryUIDatepicker   : '../lib/jquery-ui/jquery.ui.datepicker',
        underscore           : '../lib/underscore/underscore-1.4.4-min',
        underscoreString     : '../lib/underscore/underscore.string',
        backbone             : '../lib/backbone/backbone-1.0.0-min',
        modelbinding         : '../lib/backbone/backbone.modelbinding',
        backboneModelBinding : '../lib/backbone/backbone.modelbinder-1.0.0-min',
        visualsearch         : '../lib/app/visualsearch',
        marionette           : '../lib/backbone/backbone.marionette-1.0.2-min',
        text                 : '../lib/require/text',
        domReady             : '../lib/require/domReady',
        json                 : '../lib/utils/json2',
        bootstrap            : '../lib/bootstrap/bootstrap.min',

        jasmine              : '../lib/jasmine/jasmine',
        'jasmine.html'       : '../lib/jasmine/jasmine-html',
        'jasmine.jquery'     : '../lib/jasmine/jasmine-jquery',
        // bootstrapWysihtml5   : '../lib/bootstrap/bootstrap-wysihtml5',
        datejs: '../lib/utils/date'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        bootstrap: {
          deps: ["jquery"]
        },
        visualsearch: {
            deps: ['backbone', 'jqueryUIAutocomplete']
        },
        marionette: {
            deps: ['backbone']
        },
        jasmine: {exports: 'jasmine'},
        'jasmine.html':['jasmine'],
        'jasmine.jquery': ['jasmine']
    },
    onError: function (err) {
        console.error('Unable to loads module(s): ', err.requireModules);
        require.undef(err.requireModules); //this might be an array?
        console.log('Here are some more details: ', err);
    }
};

// Setup namespacing
if(typeof mv == 'undefined'){
window.mv = {  //instanciate namespace for application
  views:{},
  models:{},  
  collections:{},
  helpers:{},
  i:{ //for instaciated objects
    views:{},
    router: null
  }
};
}
