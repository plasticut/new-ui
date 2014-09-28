'use strict';

/**
    LAYOUT CONTROLLER
*/

var Controller = require('base/controller');

var LayoutController = Controller.extend({
    __before: function(actionName, params, done) {
        var LayoutView = require('views/layout');
        var app = require('app');

        this.subview('layout',
            new LayoutView({
                model: app.model
            })
        );

        done();
    }
});

module.exports = LayoutController;