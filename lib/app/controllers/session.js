'use strict';

/**
    SESSION CONTROLLER
*/

var Controller = require('base/controller');

var SessionController = Controller.extend({
    __before: function(actionName, params, done) {

        this.compose('layout', function() {
            var LayoutView = require('views/layout-unsigned');
            var app = require('app');

            var view = new LayoutView({
                model: app.model
            });

            return view;
        });

        done();
    },

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