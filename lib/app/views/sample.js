'use strict';
var View = require('base/view');
var SampleView = View.extend({
    template: 'sample',
    container: '.module-container',
    constructor: function(options){
        View.apply(this, arguments);
    },
    render: function(){
        View.prototype.render.apply(this);
    }
});

module.exports = SampleView;