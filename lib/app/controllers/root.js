'use strict';

/**
    ROOT CONTROLLER
*/

var Controller = require('./layout');

var RootController = Controller.extend({
    show: function(params) {
        var RootView = require('views/root');

        var model = new Backbone.DeepModel({
            title: 'root title'
        });

        this.subview('view',
            new RootView({
                model: model
            })
        );
    }
});

module.exports = RootController;