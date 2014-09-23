'use strict';

function Controller() {
}

var Controller = Backbone.Router.extend({

});

var p = Controller.prototype;

p.__invoke = function(action, params) {
    this[action](params);
};

p.__destroy = function() {

};

module.exports = Controller;