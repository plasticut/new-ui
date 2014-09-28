'use strict';

var Disposable = require('./disposable');

function Controller() {
    Disposable.apply(this, arguments);
}

Controller.extend = Backbone.Router.extend;

var p = Controller.prototype;

_.extend(p, Disposable.prototype);

p.__before = function(actionName, params, done) {
    done();
};

p.__invoke = function(actionName, params, done) {
    var controller = this;
    var action = this[actionName];
    if (!action) {
        return done('Action ' + actionName + ' not found.');
    }
    function next(err) {
        if (err) { return done(err); }
        action.call(controller, params, done);
    }
    this.__before(actionName, params, next);
};

p.subview = function(name, view) {
    if (this[name]) {
        this[name].dispose();
    }

    this[name] = view;
};

module.exports = Controller;