'use strict';

var Users = Backbone.Controller.extend({
    show: function(params) {
        console.log('users show', params);
    }
});

module.exports = Users;