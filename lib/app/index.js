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
    */
    controllers: require('./controllers'),

    /**
        Applcation routes
    */
    routes: require('./routes.json'),

    /**
        Main applcation model
    */
    model: require('models/index')
});

console.log('Initialize application');