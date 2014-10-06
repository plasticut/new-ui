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
    },
    events: {
        'click #btn': 'clickBtn'
    },
    clickBtn: function(){
        this.$el.find('#btn').text('Yeah, bitch!');
        return true;

    },
    clickBtn1: function(){
    }
});

module.exports = SampleView;