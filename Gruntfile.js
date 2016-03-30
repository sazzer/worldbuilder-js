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
        }
    });

    grunt.registerTask('build', ['eslint:main', 'jscpd:main', 'babel:main', 'mochaTest', 'copy:static', 'sass:main']);
    grunt.registerTask('start', ['build', 'execute:main']);
};
