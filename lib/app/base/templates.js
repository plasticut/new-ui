'use strict';

/** @module base/templates */

// initialize handlebars helpers
require('../helpers/handlebars')(Handlebars);
module.exports = require('templates')(Handlebars);