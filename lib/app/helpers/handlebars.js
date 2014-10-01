'use strict';

/** @module helpers/handlebars */

function testHelper(context, options) {
}

module.exports = function(Handlebars) {

    Handlebars.registerHelper('test', testHelper);

};
