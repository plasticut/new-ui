'use strict';

// initialize handlebars helpers
require('../helpers/handlebars')(Handlebars);
module.exports = require('templates')(Handlebars);