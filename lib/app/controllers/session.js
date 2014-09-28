'use strict';

/**
    SESSION CONTROLLER
*/

var Controller = require('./layout');

var SessionController = Controller.extend({
    login: function(params) {
        var LoginView = require('views/login');

        var model = new Backbone.DeepModel({
            title: 'root title'
        });

        this.subview('view',
            new LoginView({
                model: model
            })
        );
    },

    register: function(params) {
        var RegisterView = require('views/register');

        var model = new Backbone.DeepModel({
            title: 'root title'
        });

        this.subview('view',
            new RegisterView({
                model: model
            })
        );
    }
});

module.exports = SessionController;