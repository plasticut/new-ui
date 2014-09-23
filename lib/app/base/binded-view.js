'use strict';

var BindedView = Backbone.View.extend({
    constructor: function(options) {
        if (options) {
            _.extend(this, _.pick(options , ['bindings']));
        }

        this.binder = new Backbone.ModelBinder();

        Backbone.View.apply(this, arguments);
    },
    render: function() {
        this.binder.bind(this.model, this.el, this.bindings);
    }
});

module.exports = BindedView;