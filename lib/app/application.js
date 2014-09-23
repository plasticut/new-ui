'use strict';

/**
    class: Application
*/

var Application = Backbone.Router.extend({

    constructor: function(options){
        this.config = options.config;

        // options.routes =

        Backbone.Router.call(this, options);

        Backbone.history.start(options.config);
    },

    prepareRoutes: function(routes) {
        // routes
        var ctrls = Backbone.Controllers;
        _(routes).keys().each(function(route) {

        });
    }
});

module.exports = Application;