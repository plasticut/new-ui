'use strict';

/**
    LAYOUT CONTROLLER
*/

var Controller = require('base/controller');

var LayoutController = Controller.extend({
    __before: function(actionName, params, done) {

        this.compose('layout', function() {
            var LayoutView = require('views/layout-signed');
            var app = require('app');

            var view = new LayoutView({
                model: app.model
            });

            return view;
        });

        this.compose('main-navbar', function() {
            var MainNavbarView = require('views/main-navbar');
            var app = require('app');

            var view = new MainNavbarView({
                model: app.model
            });

            return view;
        });

        done();
    }
});

module.exports = LayoutController;