'use strict';

var Disposable = require('./disposable');
var templates = require('./templates');

// var templateHelpers =

var View = Backbone.View.extend({
    // bindings: {
    //     '[method] [selector]': '[model field]'
    //     'class #test': 'testClass'
    // },

    attachMethod: 'append',
    container: '', // container selector or element
    template: '', // template name here
    autoRender: true,
    autoAttach: true,

    constructor: function(options) {
        if (options) {
            _.extend(this, _.pick(options , ['bindings', 'attachMethod', 'container', 'template', 'autoRender', 'autoAttach']));
        }

        this.bindings = this.__convertBindings(this.bindings);

        this.binder = new Backbone.ModelBinder();

        Disposable.apply(this, arguments);
        Backbone.View.apply(this, arguments);

        this.render = _.partial(this.__render, this.render);
        this.dispose = _.partial(this.__dispose, this.dispose);

        if (this.autoRender) {
            this.render();
        }
    },

    __convertBindings: function(bindings) {
        return bindings && _.reduce(bindings, function(memo, value, key) {
            var segments = key.split(' ');

            var item = {};

            if (segments.length > 1) {
                item.elAttribute = segments.shift();
            }

            item.selector = segments.join(' ');

            var bindings = memo[value] || (memo[value] = []);
            bindings.push(item);

            return memo;
        }, {});
    },

    __dispose: function(childDispose) {
        if (this.disposed) {
            return;
        }

        this.binder.unbind();

        this.remove();

        childDispose.call(this);
    },

    __render: function(childRender) {

        if (typeof this.template === 'string') {
            this.template = templates[this.template];
        }

        if (!this.template) {
            throw 'Unknown template "' + this.template + '"';
        }

        childRender.call(this);

        if (this.autoAttach) {
            $(this.container)[this.attachMethod](this.el);
        }
    },

    render: function() {
        this.$el.html(this.template(this.getTemplateData()));
        this.binder.bind(this.model, this.el, this.bindings);
    },

    getTemplateData: function() {
        return this.model.toJSON();
    },

    subview: function(name, view) {
        if (this[name]) {
            this[name].dispose();
        }

        this[name] = view;
    }
});

_.extend(View.prototype, Disposable.prototype);

module.exports = View;