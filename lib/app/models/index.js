'use strict';

/** @module models/index */

var BaseModel = require('base/model');

/**
    Main application model
    @class
*/
var AppModel = BaseModel.extend({
    computed: {
        path: {
            depends: [],
            get: function (fields) {
                return document.location.pathname;
            }
        }
    }
});

module.exports = AppModel;