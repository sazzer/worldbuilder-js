module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    // Keep the plugins in alphabetical order
    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                plugins: [
                    'rewire'
                ],
                presets: ['es2015']
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/main',
                    src: ['**/*.js'],
                    dest: 'target/main'
                }]
            }
        },
        clean: ['target'],
        copy: {
            options: {
                
            },
            static: {
                expand: true,
                cwd: 'src/static',
                src: ['**'],
                dest: 'target/static'
            }
        },
        eslint: {
            options: {
                configFile: 'eslintrc'
            },
            main: {
                files: [{
                    expand: true,
                    src: ['src/main/**/*.js']
                }]
            },
            ui: {
                files: [{
                    expand: true,
                    src: ['src/ui/**/*.js']
                }]
            }
        },
        execute: {
            main: {
                src: 'target/main/index.js'
            }
        },
        jscpd: {
            main: {
                path: 'src/main'
            },
            ui: {
                path: 'src/ui'
            }
        },
        mochaTest: {
            main: {
                src: [
                    'target/main/**/*.spec.js'
                ],
                options: {
                    reporter: 'spec',
                    growl: true,
                    require: 'target/main/testSetup'
                }
            }
        },
        sass: {
            options: {
                sourcemap: 'auto',
                unixNewlines: true,
                check: false,
                style: 'nested',
                cacheLocation: 'target/sass-cache'
            },
            main: {
                files: {
                    'target/static/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        watch: {
            build: {
                files: [
                    'src/**/*',
                    'Gruntfile.js',
                    'eslintrc'
                ],
                tasks: ['build'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            }
        },
        webpack: {
            ui: {
                entry: {
                    main: './src/ui/index.js'
                },
                output: {
                    path: 'target/static/js',
                    filename: '[name].js',
                    sourceMapFilename: '[file].map'
                },
                module: {
                    loaders: [
                        {
                            test: /\.jsx?$/,
                            exclude: /(node_modules)/,
                            loader: 'babel',
                            query: {
                                presets: [
                                    'es2015'
                                ]
                            }
                        }
                    ]
                },
                stats: {
                    colors: true
                },
                progress: true,
                failOnError: true,
                inline: false,
                hot: false,
                devtool: 'source-map'
            }
        }
    });

    grunt.registerTask('build:main', ['eslint:main', 'jscpd:main', 'babel:main', 'mochaTest']);
    grunt.registerTask('build:ui', ['eslint:ui', 'jscpd:ui', 'webpack:ui']);
    grunt.registerTask('build', ['build:main', 'build:ui', 'copy:static', 'sass:main']);
    grunt.registerTask('start', ['build', 'execute:main']);
};
