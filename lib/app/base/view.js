'use strict';

/** @module base/view */

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
    noWrap: false, // не оборачивать в дом элемент, необходимо чтобы в шаблоне был только один корневой элемент. используется совместно с container

    constructor: function(options) {
        if (options) {
            _.extend(this, _.pick(options , ['bindings', 'attachMethod', 'container', 'template', 'autoRender', 'autoAttach', 'noWrap']));
        }

        this.bindings = this.__convertBindings(this.bindings);

        this.binder = new Backbone.ModelBinder();

        this.render = _.partial(this.__render, this.render);
        this.dispose = _.partial(this.__dispose, this.dispose);

        if (this.noWrap) {
            this.el = this.container;
        }

        Disposable.apply(this, arguments);
        Backbone.View.apply(this, arguments);

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
            throw new Error('Unknown template "' + this.template + '"');
        }

        var html = this.template(this.getTemplateData());

        if (this.noWrap) {
            var el = document.createElement('div');
            el.innerHTML = html;

            if (el.children.length > 1) {
                throw new Error('There must be a single top-level element when using `noWrap`.');
            }
            this.setElement(el.firstChild, true);
        } else {
            this.$el.html(html);
        }

        this.binder.bind(this.model, this.el, this.bindings);

        childRender.call(this);

        if (this.autoAttach) {
            $(this.container)[this.attachMethod](this.el);
        }
    },

    render: function() {
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