'use strict';

/**
    class: Application
*/

var History = require('base/history');
Backbone.history = new History();

var Application = Backbone.Router.extend({

    constructor: function(options){
        this.config = options.config;
        this.controllers = options.controllers;

        var anyRouter = new Backbone.Router({ routes: { '*any': 'any' } });
        anyRouter.on('route', this._onUnknownRoute);

        Backbone.Router.call(this, options);

        var AppModel = options.model;

        this.model = new AppModel({
            title: 'NEW UI!'
        });

        $(function() {

            Backbone.history.start(options.config);

            $('body').niceScroll({
                cursorwidth: '7',
                cursorborder:'',
                cursorcolor:'#555',
                cursoropacitymax:'0.2',
                railpadding: {
                    top: 120,
                    right: 3,
                    left: 0,
                    bottom: 20
                }
            });


        });
    },

    route: function(route, name, callback) {
        if (!_.isRegExp(route)) {
            route = this._routeToRegExp(route);
        }
        if (_.isFunction(name)) {
            callback = name;
            name = '';
        }

        if (!callback) {
            callback = this[name];
        }

        var router = this;

        Backbone.history.route(route, function(fragment, next) {
            var args = router._extractParameters(route, fragment);
            router.execute(callback, args, name, next);
            router.trigger.apply(router, ['route:' + name].concat(args));
            router.trigger('route', name, args);
            Backbone.history.trigger('route', router, name, args);
        });
        return this;
    },

    execute: function(callback, params, name, next) {
        console.log('Handle route', name);

        name = name.split('.');

        var controllerName = name[0];
        var actionName = name[1];

        var Controller = this.controllers[controllerName];
        if (!Controller) {
            throw 'Controller ' + controllerName + ' not found.';
        }

        var prevController = this.controller;


        if (prevController instanceof Controller) {
            console.log('Controller not changed.');
        } else {
            console.log('Creating new controller "' + controllerName + '"');
            if (prevController) {
                prevController.dispose();
                prevController = null;
            }
            this.controller = new Controller();
        }

        console.log('Invoke action "' + actionName + '"');
        this.controller.__invoke(actionName, params, next);
    },

    _onUnknownRoute: function() {
        var url = arguments[1][0];
        console.error('Route handler for "' + url + '" not found.');
    }
});

module.exports = Application;