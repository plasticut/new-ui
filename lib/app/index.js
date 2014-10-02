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
        pushState: false,
        root: '/'
    },

    /**
        Application controllers
    */
    controllers: {
        session: require('controllers/session'),
        root: require('controllers/root'),
        sample: require('controllers/sample')
    },

    /**
        Applcation routes
    */
    routes: {
        '': 'root.show',
        'login': 'session.login',
        'register': 'session.register',
        'sample': 'sample.index'
    },

    model: require('models/index')
});