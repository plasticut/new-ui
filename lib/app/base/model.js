'use strict';

/** @module base/model */

/**
    Base model class
    @class
    @extends Backbone.DeepModel
*/
var Model = Backbone.DeepModel.extend({
    /** @lends Model */

    constructor: function(options) {
        Backbone.DeepModel.call(this, options);
        this.computedFields = new Backbone.ComputedFields(this);
    }
});

module.exports = Model;