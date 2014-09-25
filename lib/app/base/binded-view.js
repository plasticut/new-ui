'use strict';

var templateHelpers =

var BindedView = Backbone.View.extend({
    bindings: {
    },
    contain: 'html',
    // template: '', template name here
    constructor: function(options) {
        if (options) {
            _.extend(this, _.pick(options , ['bindings']));
        }

        this.binder = new Backbone.ModelBinder();

        Backbone.View.apply(this, arguments);
    },
    render: function() {
        var template = Backbone.Templates[this.template];
        if (!template) {
            throw 'Unknown template "' + this.template + '"';
        }
        this.$el[this.contain](template(this.model.toJSON()));
        this.binder.bind(this.model, this.el, this.bindings);
    }
});

module.exports = BindedView;