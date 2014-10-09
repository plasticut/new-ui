'use strict';

/** @module base/disposable */

/**
    @class Disposable
*/
function Disposable() {

}

module.exports = Disposable;

var p = Disposable.prototype;

/**
    Mark object as disposed and it`s sub objects
    @method
*/
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