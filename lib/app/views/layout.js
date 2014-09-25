'use strict';

var Ancestor = Backbone.BindedView;
var LayoutView = Ancestor.extend({
    constructor: function(options) {
        Ancestor.apply(this, arguments);
    },
    render: function() {
        Ancestor.prototype.render.apply(this);
    }
});

module.exports = LayoutView;