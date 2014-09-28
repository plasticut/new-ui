module.exports = function(grunt) {

    var _ = require('grunt-browserify/node_modules/lodash');
    var path = require('path');

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('unpathify');

    grunt.loadTasks('tasks');

    var vendorScripts = [
        'bower_components/handlebars/handlebars.js',

        'bower_components/jquery/dist/jquery.js',
        'bower_components/lodash/dist/lodash.underscore.js',
        'bower_components/backbone/backbone.js',


        'bower_components/backbone-computedfields/lib/backbone.computedfields.js',

        'bower_components/backbone-deep-model/lib/underscore.mixin.deepExtend.js',
        'bower_components/backbone-deep-model/src/deep-model.js',

        'bower_components/backbone.modelbinder/Backbone.ModelBinder.js',
        'bower_components/backbone.modelbinder/Backbone.CollectionBinder.js',

        'bower_components/jquery-address/src/jquery.address.js',

        'bower_components/semantic-ui/build/uncompressed/modules/accordion.js',
        'bower_components/semantic-ui/build/uncompressed/modules/chatroom.js',
        'bower_components/semantic-ui/build/uncompressed/modules/checkbox.js',
        'bower_components/semantic-ui/build/uncompressed/modules/dimmer.js',
        'bower_components/semantic-ui/build/uncompressed/modules/dropdown.js',
        'bower_components/semantic-ui/build/uncompressed/modules/modal.js',
        'bower_components/semantic-ui/build/uncompressed/modules/nag.js',
        'bower_components/semantic-ui/build/uncompressed/modules/popup.js',
        'bower_components/semantic-ui/build/uncompressed/modules/rating.js',
        'bower_components/semantic-ui/build/uncompressed/modules/search.js',
        'bower_components/semantic-ui/build/uncompressed/modules/shape.js',
        'bower_components/semantic-ui/build/uncompressed/modules/sidebar.js',
        'bower_components/semantic-ui/build/uncompressed/modules/tab.js',
        'bower_components/semantic-ui/build/uncompressed/modules/transition.js',
        'bower_components/semantic-ui/build/uncompressed/modules/video.js',
        'bower_components/semantic-ui/build/uncompressed/modules/behavior/api.js',
        'bower_components/semantic-ui/build/uncompressed/modules/behavior/colorize.js',
        'bower_components/semantic-ui/build/uncompressed/modules/behavior/form.js',
        'bower_components/semantic-ui/build/uncompressed/modules/behavior/state.js'
    ];

    grunt.initConfig({

        pkg: grunt.file.readJSON('./package.json'),

        server: {
            host: 'localhost',
            port: 9000,
            livereload: 9999
        },


        /*

            SCRIPTS

        */
        jshint: {
            options: {
                reporter: 'node_modules/jshint-stylish/stylish.js',
                jshintrc: true
            },
            dev: {
                src: 'lib/app/**/*.js'
            }
        },

        concat: {
            options: {
            },

            'vendor-dev': {
                src: vendorScripts,
                dest: '.tmp/js/vendor.js'
            },

            'vendor-dist': {
                src: vendorScripts,
                dest: 'dist/public/js/vendor.js'
            }
        },

        browserify: {
            options: {
            },

            'scripts-dev': {
                options: {
                    alias: [
                        __dirname + '/lib/app/index.js:app'
                    ],
                    preBundleCB: function (b) {
                        b.plugin(require('remapify'), [
                            {
                                src: '**/*.js',
                                cwd: 'lib/app/views',
                                expose: 'views'
                            },
                            {
                                src: '**/*.js',
                                cwd: 'lib/app/controllers',
                                expose: 'controllers'
                            },
                            {
                                src: '**/*.js',
                                cwd: 'lib/app/models',
                                expose: 'models'
                            },
                            {
                                src: '**/*.js',
                                cwd: 'lib/app/base',
                                expose: 'base'
                            }
                        ]);
                    },
                    browserifyOptions: {
                        debug: true
                    },
                    external: [
                        'templates',
                        'handlebars'
                    ]
                },
                src: ['lib/app/index.js'],
                dest: '.tmp/js/app.js'
            },

            'scripts-dist': {
                options: {
                    external: [
                        'handlebars'
                    ]
                },
                src: ['lib/app/index.js'],
                dest: 'dist/public/js/app.js'
            },

            'templates-dev': {
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    alias: [
                         __dirname + '/.tmp/js/templates.js:templates'
                    ]
                },
                src: [],
                dest: '.tmp/js/templates.js'
            },

            'templates-dist': {
                options: {
                    alias: [
                         __dirname + '/dist/public/js/templates.js:templates'
                    ]
                },
                src: [],
                dest: 'dist/public/js/templates.js'
            }
        },

        unpathify: {
            dist: {
                src: ['dist/public/js/app.js']
            }
        },

        uglify: {
            options: {
                // mangle: false
            },

            dist: {
                 options: {
                    sourceMap: false
                },
                files: {
                    'dist/public/js/bundle.min.js': [
                        'dist/public/js/vendor.js',
                        'dist/public/js/templates.js',
                        'dist/public/js/app.js'
                    ]
                }
            }
        },


        /*

            STYLES

        */
        stylus: {
            options: {
                'include css': true,
                paths: [
                    'bower_components/semantic-ui/build/uncompressed'
                    // 'path/to/import', 'another/to/import'
                ],
                urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
                use: [
                ],
                import: [
                    //  @import 'foo', 'bar/moo', etc. into every .styl file
                    //  that is compiled. These might be findable based on values you gave
                    //  to `paths`, or a plugin you added under `use`
                ]
            },

            dev: {
                options: {
                    compress: false
                },
                files: {
                    '.tmp/css/app.css': [
                        'lib/ui/default/styles/app.styl'
                    ]
                }
            },

            dist: {
                options: {
                    compress: true
                },
                files: {
                    'dist/public/css/app.css': [
                        'lib/ui/default/styles/app.styl'
                    ]
                }
            }
        },

        /*
            VIEWS
        */
        jade: {
            dev: {
                options: {
                    pretty: true,
                    data: function() {
                        return {
                        };
                    }
                },
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        dest: '.tmp',
                        cwd: 'lib/views',
                        ext: '.html',
                        src: [
                            '**/*.jade'
                        ]
                    }
                ]
            },
            dist: {
                options: {
                    pretty: false,
                    data: function() {
                        return {
                            dist: true
                        };
                    }
                },
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        dest: 'dist/public',
                        cwd: 'lib/views',
                        ext: '.html',
                        src: [
                            '**/*.jade'
                        ]
                    }
                ]
            }
        },

        /*

            TEMPLATES

        */
        handlebars: {
            'templates-dev': {
                options: {
                    namespace: false,
                    commonjs: true,
                    wrapped: true,
                    processName: function(filePath) {
                        return path.basename(path.relative('lib/ui/default/templates', filePath), '.hbs');
                    }
                },
                files: {
                    '.tmp/js/templates.js': [
                        'lib/ui/default/templates/**/*.hbs'
                    ]
                }
            },
            'templates-dist': {
                options: {
                    namespace: false,
                    commonjs: true,
                    wrapped: true,
                    processName: function(filePath) {
                        return path.basename(path.relative('lib/ui/default/templates', filePath), '.hbs');
                    }
                },
                files: {
                    'dist/public/js/templates.js': [
                        'lib/ui/default/templates/**/*.hbs'
                    ]
                }
            }
        },


        /*

            ASSETS

        */
        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        dest: '.tmp',
                        cwd: 'ui/default/images',
                        src: [
                            'favicon.ico'
                        ]
                    },
                    {
                        expand: true,
                        filter: 'isFile',
                        dest: '.tmp/img',
                        cwd: 'ui/default/images',
                        src: [
                            '**/*.png',
                            '**/*.jpg'
                        ]
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        dest: 'dist/public',
                        cwd: 'src/images',
                        src: [
                            'favicon.ico'
                        ]
                    },
                    {
                        expand: true,
                        filter: 'isFile',
                        dest: 'dist/public/img',
                        cwd: 'src/images',
                        src: [
                            '**/*.png',
                            '**/*.jpg'
                        ]
                    }
                ]
            }
        },

        /*

            WATCHER

        */
        watch: {
            options: {
                nospawn: true,
                livereload: '<%= server.livereload %>'
            },
            scripts: {
                files: [
                    'lib/app/**/*.js'
                ],
                tasks: [
                    'jshint',
                    'notify:jshint',
                    'browserify:scripts-dev'
                ]
            },
            styles: {
                files: [
                    'lib/ui/**/*.styl'
                ],
                tasks: [
                    'styles-dev'
                ]
            },
            templates: {
                files: [
                    'lib/ui/default/templates/**/*.hbs'
                ],
                tasks: [
                    'templates-dev'
                ]
            },
            views: {
                files: [
                    'lib/views/**/*.jade'
                ],
                tasks: [
                    'views-dev'
                ]
            }
        },

        /*

            TEST

        */
        // mochaTest: {
        //     test: {
        //         options: {
        //             reporter: 'spec',
        //             colors: true,
        //             timeout: 5000,
        //             debug: true,
        //             growl: true,
        //             require: 'test/coverage'
        //         },
        //         src: [
        //             'test/cases/**/*.js'
        //         ]
        //     },
        //     coverage: {
        //         options: {
        //             reporter: 'html-cov',
        //             quiet: true,
        //             captureFile: 'test/coverage.html'
        //         },
        //         src: [
        //             'test/cases/**/*.js'
        //         ]
        //     }
        // },

        // blanket: {
        //     coverage: {
        //         options: {},
        //         files: {
        //             'lib/app-cov': [
        //                 'lib/app/'
        //             ]
        //         }
        //     }
        // }

        /*

            UTILS

        */
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5 // maximum number of notifications from jshint output
            }
        },

        notify: {
            jshint: {
                options: {
                    message: 'JSHint: ok!'
                }
            }
        },

        clean: {
            dist: [ 'dist/' ],
            dev: [ '.tmp/' ]
        },

        connect: {
            dev: {
                options: {
                    hostname: '<%= server.host %>',
                    port: '<%= server.port %>',
                    livereload: '<%= server.livereload %>',
                    base: [
                        '.tmp',
                        'bower_components/semantic-ui/build/uncompressed'
                    ]
                }
            }
        },

        jsbeautifier : {
            options : {
            },
            'templates-dev': {
                src : ['.tmp/js/templates.js']
            }
        }
    });

    var defaultTestSrc = grunt.config('mochaTest.test.src');
        grunt.event.on('watch', function(action, filepath) {
            grunt.config('mochaTest.test.src', defaultTestSrc);
            if (filepath.match('test/')) {
                grunt.config('mochaTest.test.src', filepath);
            }
    });

    /*
        Helper tasks
    */

    /* SCRIPTS */
    grunt.registerTask('scripts-dev', [
        'concat:vendor-dev',
        'browserify:scripts-dev'
    ]);

    grunt.registerTask('scripts-dist', [
        'concat:vendor-dist',
        'browserify:scripts-dist',
        'unpathify:dist',
        'uglify:dist'
    ]);

    /* STYLES */
    grunt.registerTask('styles-dev', [
        'stylus:dev'
        // 'autoprefixer:dev',
        // 'csscomb:dev'
    ]);

    grunt.registerTask('styles-dist', [
        'stylus:dist'
        // 'autoprefixer:dist',
        // 'csscomb:dist',
        // 'cssmin:dist'
    ]);


    /* TEMPLATES */
    grunt.registerTask('templates-dev', [
        'handlebars:templates-dev',
        'browserify:templates-dev',
        'jsbeautifier:templates-dev'
    ]);

    grunt.registerTask('templates-dist', [
        'handlebars:templates-dist',
        'browserify:templates-dist'
    ]);

    /* VIEWS */
    grunt.registerTask('views-dev', [
        'jade:dev',
    ]);

    grunt.registerTask('views-dist', [
        'jade:dist'
    ]);

    /*
        Main tasks
    */
    grunt.registerTask('dev', [
        'jshint',
        'clean:dev',
        'templates-dev',
        'scripts-dev',
        'styles-dev',
        'views-dev',
        'copy:dev'
    ]);

    grunt.registerTask('dist', [
        'jshint',
        'clean:dist',
        'templates-dist',
        'scripts-dist',
        'styles-dist',
        'views-dist',
        'copy:dist'
    ]);

    grunt.registerTask('default', [
        'dev',
        'connect:dev',
        'watch'
    ]);

    grunt.task.run('notify_hooks');
};
