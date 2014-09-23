
var transformTools = require('browserify-transform-tools');
var path = require('path');

module.exports = function(options) {
    return transformTools.makeStringTransform(
        "wrapify",
        {},
        function (content, transformOptions, done) {

            var file = transformOptions.file;

            var key = Object.keys(options).filter(function(key) {
                return path.basename(file) === key;
            })[0];

            if (!key) {
                return done(null, content);
            }
            var config = options[key];

            var before = Object.keys(config).map(function(fromName) {
                var toName = config[fromName];
                return 'var ' + toName + ' = require("' + fromName + '");';
            }).join('\n');

            var before = before || config.before || '';
            var after = config.after || '';

            done(null, before + content + after);
        });
};