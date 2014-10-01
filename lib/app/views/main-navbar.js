'use strict';

/**

    MAIN NAVBAR VIEW

*/

var View = require('views/components/list');
var View = require('base/view');

var MainNavbarView = View.extend({
    template: 'main-navbar',
    container: 'body',
    noWrap: true,
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
    }
});

module.exports = MainNavbarView;