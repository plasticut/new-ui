'use strict';

/** @module base/disposable */

function Disposable() {

}

module.exports = Disposable;

var p = Disposable.prototype;

p.dispose = function() {
    if (this.disposed) { return console.warn('Disposing disposed.'); }

    var keys = _.keys(this);
    var obj;
    for (var i=0, li=keys.length; i<li; i++) {
        obj = this[keys[i]];
        if (obj && obj.dispose) {
            obj.dispose();
        }
    }

    this.disposed = true;
};