'use strict';

/** @module base/history */

/**
    Base history class
    @class
    @extends Backbone.History
*/
var History = Backbone.History.extend({
    /** @lends History */

    loadUrl: function(fragment) {
        fragment = this.fragment = this.getFragment(fragment);
        var handlers = this.handlers;
        var prevIndex;

        function testRoutesFrom(fromIdx, next) {
            var handler;
            for (var i=fromIdx, li=handlers.length; i<li; i++) {
                handler = handlers[i];
                if (handler.route.test(fragment)) {
                    prevIndex = i;
                    handler.callback(fragment, next);
                    break;
                }
            }
        }

        testRoutesFrom(0, function() {
            testRoutesFrom(prevIndex);
        });
    }

});

module.exports = History;