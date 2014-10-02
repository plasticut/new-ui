'use strict';


var Hand = Backbone.Model.extend({
    defaults: function(){
        return {
            fingersCount: 5,
            isLeft: false
        };
    },
    cutFinger: function(){
        var newval = this.get('fingersCount')-1;
        this.set('fingersCount', newval);
    }
});

module.exports = Hand;