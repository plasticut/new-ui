'use strict';

/**

    LOGIN VIEW

*/

var View = require('base/view');

var LoginView = View.extend({
    template: 'login',
    container: 'body',
    events: {
        'click #test-button': 'clickButton'
    },
    // bindings: {
    //     'class .root-module-content': 'title'
    // },
    constructor: function(options) {
        View.apply(this, arguments);
    },
    render: function() {
        View.prototype.render.apply(this);
    },
    clickButton: function() {
        console.log('click');
        this.model.set('title', this.model.get('title') + 'a');
    }
});

module.exports = LoginView;