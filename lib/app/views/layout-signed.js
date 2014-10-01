'use strict';

/** @module views/layout-signed */

/**

    LAYOUT VIEW

*/

var ListView = require('views/components/list');
var View = require('base/view');

var LayoutView = View.extend({
    template: 'layout-signed',
    container: 'body',
    constructor: function(options) {
        View.apply(this, arguments);
    },
    render: function() {
        View.prototype.render.apply(this);

        /*
        this.subview('menu', new ListView({
            template: 'tabs',
            attachMethod: 'prepend',
            container: this.$el,
            model: this.model
        }));
        */
    }
});

module.exports = LayoutView;