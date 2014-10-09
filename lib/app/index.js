'use strict';

/** @module index */

/**
    Create application instance
*/

var Application = require('base/application');

module.exports = new Application({

    /**
        Main application config
    */
    config: {
        pushState: true,
        root: '/'
    },

    /**
        Application controllers
        @field
    */
    controllers: require('./controllers'),

    /**
        Applcation routes
        @field
    */
    routes: require('./routes.json'),
    model: require('models/index')
});

console.log('Initialize application');