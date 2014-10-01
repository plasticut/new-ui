'use strict';

/** @module views/components/list */

/**

    LIST VIEW

*/

var View = require('base/view');

var ListView = View.extend({
    itemSelector: '.ui.menu .item',
    modelPath: 'index',
    constructor: function(options) {
        var events = this.events || (this.events = {});
        events['click ' + this.itemSelector] = '__onClickItem';

        View.apply(this, arguments);

        this.model.on('change:' + this.modelPath, _.bind(this.__updateItem, this));
    },
    render: function() {
        View.prototype.render.apply(this);
        this.__updateItem();
    },
    __onClickItem: function(ev) {
        this.model.set(this.modelPath, $(ev.currentTarget).index());
    },
    __updateItem: function() {
        var $items = this.$(this.itemSelector);
        var newItem = $items[this.model.get(this.modelPath) || 0];
        $items.not(newItem).removeClass('active');
        $(newItem).addClass('active');
    }
});

module.exports = ListView;