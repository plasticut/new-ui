'use strict';

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
        root: require('controllers/root')
    },

    /**
        Applcation routes
    */
    routes: {
        '': 'root.show',
        'login': 'session.login',
        'register': 'session.register'
    },

    model: require('models/index')
});