'use strict';

/**
    MAIN APPLICATION MODEL
*/

var Model = Backbone.DeepModel.extend({
    computed: {
        path: {
            depends: [],
            get: function (fields) {
                return document.location.pathname;
            }
        }
    },

    initialize: function() {
        this.computedFields = new Backbone.ComputedFields(this);
    }
});

module.exports = Model;