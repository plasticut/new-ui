module.exports = function(grunt) {

    var _ = require('grunt-browserify/node_modules/lodash');
    var path = require('path');
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('unpathify');
    grunt.loadNpmTasks('grunt-contrib-testem');
    grunt.loadNpmTasks('grunt-blanket');

    grunt.loadTasks('tasks');

    var remapify = [
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
    ];

    var handlebarsOptions = {
        namespace: false,
        commonjs: true,
        wrapped: true,
        processName: function(filePath) {
            return path.basename(path.relative('lib/ui/default/templates', filePath), '.hbs');
        }
    }

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

        'bower_components/nicescroll/jquery.nicescroll.js',

        /* BOOTSTRAP */
        'bower_components/bootstrap/js/affix.js',
        'bower_components/bootstrap/js/alert.js',
        'bower_components/bootstrap/js/button.js',
        'bower_components/bootstrap/js/carousel.js',
        'bower_components/bootstrap/js/collapse.js',
        'bower_components/bootstrap/js/dropdown.js',
        'bower_components/bootstrap/js/modal.js',
        'bower_components/bootstrap/js/tooltip.js',
        'bower_components/bootstrap/js/popover.js',
        'bower_components/bootstrap/js/scrollspy.js',
        'bower_components/bootstrap/js/tab.js',
        'bower_components/bootstrap/js/transition.js',
    ];

    grunt.initConfig({

        pkg: grunt.file.readJSON('./package.json'),

        server: {
            host: 'localhost',
            port: 9000,
            livereload: 9999,
            docs: 9090
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
            },

            'vendor-tests': {
                src: vendorScripts,
                dest: '.tmp/test/vendor.js'
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
                        b.plugin(require('remapify'), remapify);
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

            'scripts-tests':{
                options: {
                    preBundleCB: function (b) {
                        b.plugin(require('remapify'), remapify);
                    },
                    browserifyOptions: {
                        debug: true
                    },
                    external: [
                        'templates',
                        'handlebars'
                    ]
                },
                src: ['test/**/*.js'],
                dest: '.tmp/test/bundle.js'
            },
            'scripts-coverage':{
                options: {
                    preBundleCB: function (b) {
                        b.plugin(require('remapify'), [
                            {
                                src: '**/*.js',
                                cwd: '.tmp/lib-cov/app/views',
                                expose: 'views'
                            },
                            {
                                src: '**/*.js',
                                cwd: '.tmp/lib-cov/app/controllers',
                                expose: 'controllers'
                            },
                            {
                                src: '**/*.js',
                                cwd: '.tmp/lib-cov/app/models',
                                expose: 'models'
                            },
                            {
                                src: '**/*.js',
                                cwd: '.tmp/lib-cov/app/base',
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
                src: ['test/**/*.js'],
                dest: '.tmp/test/instrumented.js'
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

            'templates-tests': {
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    alias: [
                         __dirname + '/.tmp/test/templates.js:templates'
                    ]
                },
                src: [],
                dest: '.tmp/test/templates.js'
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
        less: {
            dev: {
                options: {
                    strictMath: true,
                    outputSourceFiles: true,
                    sourceMap: true,
                    sourceMapURL: 'css/app.css.map',
                    sourceMapFilename: '.tmp/css/app.css.map',
                    paths: [
                        'bower_components'
                    ]
                },
                files: {
                    '.tmp/css/app.css': 'lib/ui/default/styles/app.less'
                }
            },
            dist: {
                options: {
                    compress: true,
                    strictMath: true,
                    paths: [
                        'bower_components'
                    ]
                },
                files: {
                    'dist/public/css/app.css': [
                        'lib/ui/default/styles/app.less'
                    ]
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: [
                    'Android 2.3',
                    'Android >= 4',
                    'Chrome >= 20',
                    'Firefox >= 24', // Firefox 24 is the latest ESR
                    'Explorer >= 8',
                    'iOS >= 6',
                    'Opera >= 12',
                    'Safari >= 6'
                ]
            },
            dev: {
                options: {
                    map: true
                },
                src: '.tmp/css/app.css'
            },
            dist: {
                options: {
                    map: true
                },
                src: 'dist/public/css/app.css'
            }
        },

        csslint: {
            options: {
                csslintrc: 'lib/ui/default/styles/.csslintrc'
            },
            dev: {
                src: '.tmp/css/app.css'
            },
            dist: {
                src: 'dist/public/css/app.css'
            }
        },

        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                noAdvanced: true
            },
            dist: {
                files: {
                    'dist/public/css/app.min.css': 'dist/public/css/app.css'
                }
            }
        },

        csscomb: {
            options: {
                config: 'lib/ui/default/styles/.csscomb.json'
            },
            dev: {
                expand: true,
                cwd: '.tmp/css/',
                src: ['*.css', '!*.min.css'],
                dest: '.tmp/css/'
            },
            dist: {
                expand: true,
                cwd: 'dist/public/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/public/css/'
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
                options: handlebarsOptions,
                files: {
                    '.tmp/js/templates.js': [
                        'lib/ui/default/templates/**/*.hbs'
                    ]
                }
            },
            'templates-dist': {
                options: handlebarsOptions,
                files: {
                    'dist/public/js/templates.js': [
                        'lib/ui/default/templates/**/*.hbs'
                    ]
                }
            },
            'templates-tests' :{
                options: handlebarsOptions,
                files:{
                    '.tmp/test/templates.js': [
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
                    'lib/ui/**/*.less'
                ],
                tasks: [
                    'styles-dev',
                    'csslint:dev',
                    'notify:csslint'
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

        blanket: {
            cov:{
                options: {},
                files: {
                   '.tmp/lib-cov/': ['lib/'],
                }
            }
        },

        testem: {
            dev: {
                src: [
                    'bower_components/chai/chai.js',
                    'bower_components/sinonjs/sinon.js',
                    '.tmp/test/vendor.js',
                    '.tmp/test/templates.js',
                    '.tmp/test/bundle.js'
                ],
                options: {
                    framework: 'mocha',
                    launch_in_dev: ['chrome'],
                    launch_in_ci: ['chrome']
                }
            },

            coverage: {
                src: [
                    'bower_components/chai/chai.js',
                    'bower_components/sinonjs/sinon.js',
                    '.tmp/test/vendor.js',
                    '.tmp/test/templates.js',
                    '.tmp/test/bundle.js'
                ],
                options: {
                    framework: 'mocha',
                    launchers: {
                        coverage:{
                            command: "node_modules/mocha-phantomjs/bin/mocha-phantomjs -R json-cov test/test-cov.html | node_modules/json2htmlcov/bin/json2htmlcov > coverage.html"
                        }
                    },
                    launch_in_dev: ['coverage'],
                    launch_in_ci: ['coverage']
                }
            }
        },

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
                    message: 'JS: ok!'
                }
            },
            csslint: {
                options: {
                    message: 'CSS: ok!'
                }
            }
            ,tests: {
                options: {
                    message: 'Tests passed'
                }
            }
        },

        clean: {
            dist: [ 'dist/' ],
            dev: [ '.tmp/' ],
            tests: ['.tmp/test/',  'coverage.html'],
            coverage: ['.tmp/test/lib-cov/', '.tmp/test/instrumented.js']
        },

        connect: {
            dev: {
                options: {
                    hostname: '<%= server.host %>',
                    port: '<%= server.port %>',
                    livereload: '<%= server.livereload %>',
                    base: [
                        '.tmp'
                    ]
                }
            },
            docs: {
                options: {
                    hostname: '<%= server.host %>',
                    port: '<%= server.docs %>',
                    open: true,
                    keepalive: true,
                    base: [
                        'doc'
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
        },

        jsdoc : {
            dist : {
                src: ['lib/**/*.js', 'test/**/*.js'],
                options: {
                    destination: 'doc'
                }
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


    grunt.registerTask('scripts-tests', [
        'browserify:scripts-tests'
    ]);


    grunt.registerTask('scripts-coverage', [
        'blanket',
        'browserify:scripts-coverage'
    ]);

    grunt.registerTask('scripts-dist', [
        'concat:vendor-dist',
        'browserify:scripts-dist',
        'unpathify:dist',
        'uglify:dist'
    ]);

    /* STYLES */
    grunt.registerTask('styles-dev', [
        'less:dev',
        'autoprefixer:dev',
        'csscomb:dev'
    ]);

    grunt.registerTask('styles-dist', [
        'less:dist',
        'autoprefixer:dist',
        'csscomb:dist',
        'cssmin:dist'
    ]);


    /* TEMPLATES */
    grunt.registerTask('templates-dev', [
        'handlebars:templates-dev',
        'browserify:templates-dev',
        'jsbeautifier:templates-dev'
    ]);


    grunt.registerTask('templates-tests', [
        'handlebars:templates-tests',
        'browserify:templates-tests'
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
        'styles-dev',
        'csslint:dev',
        'templates-dev',
        'scripts-dev',
        'views-dev',
        'copy:dev'
    ]);

    grunt.registerTask('dist', [
        'jshint',
        'clean:dist',
        'styles-dist',
        'csslint:dist',
        'templates-dist',
        'scripts-dist',
        'views-dist',
        'copy:dist'
    ]);

    grunt.registerTask('docs', [
        'jsdoc',
        'connect:docs'
    ]);


    grunt.registerTask('tests', [
        'clean:tests',
        'scripts-tests',
        'concat:vendor-tests',
        'templates-tests',
        'testem:run:dev',
    ]);


    grunt.registerTask('coverage', [
        'clean:coverage',
        'scripts-coverage',
        'concat:vendor-tests',
        'templates-tests',
        'testem:run:coverage',
    ]);

    grunt.registerTask('default', [
        'dev',
        'connect:dev',
        'watch'
    ]);

    grunt.task.run('notify_hooks');
};
