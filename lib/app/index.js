'use strict';

/**
    Create application instance
*/

Backbone.Controller = require('./base/controller');
Backbone.BindedView = require('./base/binded-view');

Backbone.Controllers = require('./controllers');

$(function(){

    var Application = require('./application');

    module.exports = new Application({
        routes: require('./routes'),
        config: require('./config')
    });



    $('.filter.menu .item')
      .tab()
    ;

    $('.ui.rating')
      .rating({
        clearable: true
      })
    ;

    $('.ui.sidebar')
      .sidebar('attach events', '.launch.button')
    ;

    $('.ui.dropdown')
      .dropdown()
    ;
});
