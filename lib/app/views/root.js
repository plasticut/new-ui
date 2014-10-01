'use strict';

/**

    ROOT VIEW

*/

var ListView = require('views/components/list');
var View = require('base/view');

var RootView = View.extend({
    template: 'root',
    container: '.module-container',
    events: {
    },
    // bindings: {
    //     'class .root-module-content': 'title'
    // },
    constructor: function(options) {
        View.apply(this, arguments);
    },
    render: function() {
        View.prototype.render.apply(this);

        // this.subview('list', new ListView({
        //     template: 'list',
        //     container: this.$el,
        //     model: this.model
        // }));
    }
});

module.exports = RootView;