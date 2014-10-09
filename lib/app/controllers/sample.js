'use strict';

var Controller = require('./layout');

var SampleController = Controller.extend({
    index: function(){
        var SampleView = require('views/sample');
        var model = new Backbone.DeepModel({
            title: 'sample title'
        });
        this.subview('view',
            new SampleView({
                model: model
            })
        );
    }
});
module.exports = SampleController;